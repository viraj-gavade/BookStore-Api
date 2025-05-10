import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

/**
 * Authentication service handling user registration, login, and logout
 * Manages interactions with Prisma database and JWT token operations
 */
@Injectable()
export class AuthService {
    /**
     * Constructor initializes dependencies for auth operations
     * @param prisma - Database service for user operations
     * @param JwtService - Service for JWT token generation and validation
     */
    constructor(private prisma:PrismaService, private JwtService:JwtService){}

    /**
     * Registers a new user in the system
     * @param email - User's email address
     * @param password - User's password (will be hashed)
     * @param username - User's chosen username
     * @returns Promise resolving to the created user record
     */
    async RegisterUser(email:string,password:string,username:string){
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds of 10
        return this.prisma.user.create({
            data:{
                username,
                password:hashedPassword,
                email
            }
        })
    }

    /**
     * Authenticates a user and issues a JWT token
     * @param email - User's email for authentication
     * @param password - User's password to verify
     * @param response - Express response object for setting cookies
     * @returns Object containing login status message or error
     */
    async LoginUser(email:string,password:string,response:any){
        const user = await this.prisma.user.findUnique({where:{email}})
        if(!user){
           return response.status(401).json({message:'Invalid email or password'})
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return response.status(401).json({message:'Invalid email or password'})
        }
        const payload = {UserId:user.id, username : user.username}
        const acccessToken = this.JwtService.sign(payload)
        response.cookie('access_token', acccessToken);
   
        return {
            message: 'Login successfully!',
        }
     }

     /**
      * Logs out a user by clearing authentication cookies
      * @param response - Express response object for clearing cookies
      * @returns Object with logout confirmation message
      */
     async LogOutUser(response:Response){
      
        response.clearCookie('access_token');
   
        return {
            message: 'Logged Out successfully!',
        }
     }
}
