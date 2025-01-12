import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuthService {
    constructor(private readonly prisma:PrismaService){}
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
}
