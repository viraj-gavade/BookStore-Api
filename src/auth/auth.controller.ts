import { Body, Controller, Post,Res } from '@nestjs/common';
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
    async login(
        @Body() LoginUserDto: LoginUserDto,
        @Res({ passthrough: true }) response: any, // Inject the response object
    ) {
        return this.AuthServices.LoginUser(LoginUserDto.email, LoginUserDto.password, response);
    }
}


