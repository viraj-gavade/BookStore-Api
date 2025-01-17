import { Injectable,Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedRequest} from 'src/auth/auth.middleware';
import { ChangePasswordDto } from './dto/chnage-password-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

    constructor(private readonly prisma :PrismaService){}
    async GetProfileById(@Req() req: AuthenticatedRequest){
        const { UserId } = req.user;
        return this.prisma.user.findUnique({where:{id:UserId},select:{
            username:true,
            email:true,
        }})

    }

    async UpdateProfile(@Req() req:AuthenticatedRequest,UpdateUserDto:UpdateUserDto){
        return this.prisma.user.update({where:{id:req.user.UserId},select:{ username:true,
            email:true,},data:UpdateUserDto})

    }

    async UpdatePassword(@Req() req:AuthenticatedRequest,ChangePasswordDto:ChangePasswordDto){
        const user = await this.prisma.user.findUnique({where:{id:req.user.UserId}})
        console.log('UserPassFromDB:',user.password)
        const { oldPassword , newPassword } = ChangePasswordDto;
        console.log(oldPassword)
          const isPasswordCorrect = await bcrypt.compare(oldPassword,user.password)
                if(!isPasswordCorrect){
                    throw new Error('Invalid password')
                }
            const hashedPassword = await bcrypt.hash(newPassword,10)
        return this.prisma.user.update({where:{id:req.user.UserId},data:{password:hashedPassword}})

    }

    async DeleteUser(@Req() req:AuthenticatedRequest){
        return this.prisma.user.delete({where:{id:req.user.UserId}})
    }
} 


