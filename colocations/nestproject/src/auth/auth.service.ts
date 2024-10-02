import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService : MailerService

  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.usersService.getUserByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser._id, newUser.email);
    await this.updateUserRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

	async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.getUserByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user._id, user.email);
    await this.updateUserRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

	async logout(userId: string) {
    return this.usersService.updateUser(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateUserRefreshToken(userId: any, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: any, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async forgetPassword(email: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Email incorrect');
    }
    const accessToken = this.jwtService.sign({ _id: user._id }, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '5m',
    });
    const mailOptions = {
      to: user.email,
      subject: 'Password Reset',
      template: './forgot-password', // Template file for HTML email
      context: {
        token: accessToken,
      },
      html:`<b>your token to reset your password : </b>,<a href=http://localhost:3001/user/${accessToken}>clic here</a>`
    };
    await this.usersService.updateToken(user._id, accessToken);
    // Log the username to ensure it's valid
    console.log('Recipient email:', user.email);
    // Log mail options to ensure they are correct
    console.log('Mail options:', mailOptions);
    await this.mailerService.sendMail(mailOptions);
    return {
      success: true,
      message: 'You can change your password',
      data: user,
    };
  }

  async resetPassword(token:string,newPassword:string):Promise<any>{
    try {
      const verifyToken=await this.jwtService.verify(token,{
        secret:this.configService.get<string>('JWT_ACCESS_SECRET')
      })
      const user = await this.usersService.findOne({_id:verifyToken._id});
      if(!user){
        throw new BadRequestException('Invalid Token')
      }
      user.password = await this.hashData(newPassword);
      user.refreshToken = undefined;
      await user.save();
      return {
        success : true,
        message : 'password has been reset successfully'
      }}
      catch{
        throw new BadRequestException('invalid Token')
      }
  }



}