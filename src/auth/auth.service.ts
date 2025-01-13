import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService, private JwtService:JwtService){}
    async SinUpUser(email:string,password:string,username:string){
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data:{
                username,
                password:hashedPassword,
                email
            }
        })
    }

    async LoginUser(email:string,password:string){
        const user = await this.prisma.user.findUnique({where:{email}})
        if(!user){
            throw new Error('User not found')
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            throw new Error('Invalid password')
        }
        console.log("Is Password Correct:-",isPasswordCorrect)
        const payload = {UserId:user.id, username : user.username}
        const acccessToken = this.JwtService.sign(payload)
        return {
             access_token: acccessToken
        }
    }
}
