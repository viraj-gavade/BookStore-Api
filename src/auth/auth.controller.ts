import { Body, Controller, Post } from '@nestjs/common';
import { SignUpUserDto } from './dto/SignUp-dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUser-dto';
import { retry } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    singnup(@Body() SignUpUserDto:SignUpUserDto){
        return this.authService.SinUpUser(SignUpUserDto.email,SignUpUserDto.password,SignUpUserDto.username)
    }

    login(@Body() LoginUserDto:LoginUserDto){
        return this.authService.LoginUser(LoginUserDto.email,LoginUserDto.password)
    }
}


