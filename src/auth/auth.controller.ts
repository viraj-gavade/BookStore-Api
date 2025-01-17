import { Body, Controller, Get, Post,Res } from '@nestjs/common';
import { SignUpUserDto } from './dto/SignUp-dto';
import { LoginUserDto } from './dto/LoginUser-dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthServices : AuthService) {}
    @Post('register')
    register_user(@Body() SignUpUserDto:SignUpUserDto){
        return this.AuthServices.RegisterUser(SignUpUserDto.email,SignUpUserDto.password,SignUpUserDto.username)
    }

    @Post('login')
    async login_user(
        @Body() LoginUserDto: LoginUserDto,
        @Res({ passthrough: true }) response: any, // Inject the response object
    ) {
        return this.AuthServices.LoginUser(LoginUserDto.email, LoginUserDto.password, response);
    }
    @Get('logout') // Endpoint for logout
    async logout_user(@Res() res: Response) {
      const result = await this.AuthServices.LogOutUser(res);
      return res.status(200).json(result);
    }
  }
    



