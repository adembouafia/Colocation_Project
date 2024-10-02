import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResetDto } from './dto/reset.dto';
@ApiTags(' Authentification ')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @Post('forget')
  forgetPassword(@Body() authDto: AuthDto) {
    return this.authService.forgetPassword(authDto.email);
  }

  @Post('/:token')
  resetPassword(@Body() resetDto : ResetDto , @Param("token") token:string ){
    return this.authService.resetPassword(token,resetDto.password);
  }

 
}