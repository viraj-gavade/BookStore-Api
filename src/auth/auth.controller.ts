import { Body, Controller, Get, Post,Res } from '@nestjs/common';
import { SignUpUserDto } from './dto/SignUp-dto';
import { LoginUserDto } from './dto/LoginUser-dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

/**
 * Authentication controller
 * Handles HTTP requests for user authentication operations
 */
@Controller('auth')
export class AuthController {
    /**
     * Constructor injects the authentication service
     * @param AuthServices - Service handling authentication logic
     */
    constructor(private readonly AuthServices : AuthService) {}

    /**
     * Endpoint for user registration
     * @param SignUpUserDto - Data transfer object containing registration information
     * @returns Created user data from auth service
     */
    @Post('register')
    register_user(@Body() SignUpUserDto:SignUpUserDto){
        return this.AuthServices.RegisterUser(SignUpUserDto.email,SignUpUserDto.password,SignUpUserDto.username)
    }

    /**
     * Endpoint for user login
     * @param LoginUserDto - Data transfer object containing login credentials
     * @param response - Express response object for cookie manipulation
     * @returns Login result with authentication token
     */
    @Post('login')
    async login_user(
        @Body() LoginUserDto: LoginUserDto,
        @Res({ passthrough: true }) response: any, // Inject the response object
    ) {
        return this.AuthServices.LoginUser(LoginUserDto.email, LoginUserDto.password, response);
    }

    /**
     * Endpoint for user logout
     * @param res - Express response object for cookie clearing and response sending
     * @returns Logout confirmation message
     */
    @Get('logout')
    async logout_user(@Res() res: Response) {
      const result = await this.AuthServices.LogOutUser(res);
      return res.status(200).json(result);
    }
  }




