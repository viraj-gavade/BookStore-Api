import { Injectable,Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticatedRequest} from 'src/auth/auth.middleware';
import { ChangePasswordDto } from './dto/chnage-password-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';
import { retry } from 'rxjs';

/**
 * Service handling user-related operations
 * Manages user profile, authentication, and account operations
 */
@Injectable()
export class UserService {
    /**
     * Constructor injects the Prisma database service
     * @param prisma - Database service for user operations
     */
    constructor(private readonly prisma :PrismaService){}
    
    /**
     * Retrieves user profile data by ID from authenticated request
     * @param req - Authenticated request with user information
     * @returns User profile with selected fields (username, email)
     */
    async GetProfileById(@Req() req: AuthenticatedRequest){
        const { UserId } = req.user;
        return this.prisma.user.findUnique({where:{id:UserId},select:{
            username:true,
            email:true,
        }})
    }

    /**
     * Updates user profile information
     * @param req - Authenticated request with user information
     * @param UpdateUserDto - Data transfer object with fields to update
     * @returns Updated user profile with selected fields
     */
    async UpdateProfile(@Req() req:AuthenticatedRequest,UpdateUserDto:UpdateUserDto){
        return this.prisma.user.update({where:{id:req.user.UserId},select:{ username:true,
            email:true,},data:UpdateUserDto})
    }

    /**
     * Updates user password after verifying current password
     * @param req - Authenticated request with user information
     * @param ChangePasswordDto - Data transfer object with old and new passwords
     * @returns Updated user record
     * @throws Error if old password is incorrect
     */
    async UpdatePassword(@Req() req:AuthenticatedRequest,ChangePasswordDto:ChangePasswordDto){
        const user = await this.prisma.user.findUnique({where:{id:req.user.UserId}})
        console.log('UserPassFromDB:',user.password)
        const { oldPassword , newPassword } = ChangePasswordDto;
        console.log(oldPassword)
        // Verify the old password matches the stored password
        const isPasswordCorrect = await bcrypt.compare(oldPassword,user.password)
        if(!isPasswordCorrect){
            throw new Error('Invalid password')
        }
        // Hash the new password and update
        const hashedPassword = await bcrypt.hash(newPassword,10)
        return this.prisma.user.update({where:{id:req.user.UserId},data:{password:hashedPassword}})
    }

    /**
     * Deletes the user's account
     * @param req - Authenticated request with user information
     * @returns Success message after deletion
     */
    async DeleteUser(@Req() req:AuthenticatedRequest){
        const user = await this.prisma.user.delete({where:{id:req.user.UserId}})
        return { messsage:"User deleted", status:200 }
    }

    /**
     * Retrieves a specific user by ID
     * @param req - Authenticated request with user information
     * @param UserId - User identifier to retrieve
     * @returns User data or error message if not found
     */
    async GetSingleUser(@Req() req:AuthenticatedRequest,UserId: number){
        const user = await  this.prisma.user.findUnique({where:{id:UserId}})
        if(!user){
            return {message:'User not found',status:404}
        }
        return user
    }

    /**
     * Retrieves all users from the database
     * @param req - Authenticated request with user information
     * @returns Array of all users or error message if none found
     */
    async GetAllUsers(@Req() req:AuthenticatedRequest){
        const users = await  this.prisma.user.findMany({})
        if(!users){
            return {message:'No users found',status:404}
        }
        return users
    }
}


