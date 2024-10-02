import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { UserService } from 'src/user/user.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[ConfigModule,JwtModule.register({}),UserModule,MailerModule.forRootAsync({
    useFactory: () => ({
      transport: {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user : "c9d8b42961d25b",
          pass : "b037a0dbe66f9e",
        },
        defaults : {
          from: "abderahmenabderazak@gmail.com"
        },
      }})

}),],
  controllers: [AuthController],
  providers: [AuthService,AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
