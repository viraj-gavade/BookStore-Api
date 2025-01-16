import { Injectable,Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedRequest} from 'src/auth/auth.middleware';
import { UpdateBookDto } from 'src/book/dto/update-book.dto';
import { UpdateUserDto } from './dto/update-user-dto';


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
        return this.prisma.user.update({where:{id:req.user.UserId},data:UpdateUserDto})

    }
}
