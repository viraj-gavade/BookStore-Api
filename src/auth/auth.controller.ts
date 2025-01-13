import { Body, Controller, Post } from '@nestjs/common';
import { SignUpUserDto } from './dto/SignUp-dto';
import { LoginUserDto } from './dto/LoginUser-dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly AuthServices : AuthService) {}
    @Post('signup')
    singnup(@Body() SignUpUserDto:SignUpUserDto){
        return this.AuthServices.SinUpUser(SignUpUserDto.email,SignUpUserDto.password,SignUpUserDto.username)
    }

    @Post('signin')
    login(@Body() LoginUserDto:LoginUserDto){
        return this.AuthServices.LoginUser(LoginUserDto.email,LoginUserDto.password)
    }
}


