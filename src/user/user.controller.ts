import { Body, Controller, Delete, Get,Param,Post,Req} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { ChangePasswordDto } from './dto/chnage-password-dto';

/**
 * Controller handling user-related HTTP requests
 * Manages routes for user profile operations
 */
@Controller('user')
export class UserController {
  /**
   * Constructor injects the user service
   * @param userService - Service handling user operations
   */
  constructor (private readonly userService: UserService) {}
  
  /**
   * Endpoint to retrieve authenticated user's profile
   * @param req - Authenticated request with user information
   * @returns User profile data
   */
  @Get('profile')
  async getUserProfile(@Req() req: AuthenticatedRequest) {
    return this.userService.GetProfileById(req);
  } 
  
  /**
   * Endpoint to update user profile information
   * @param req - Authenticated request with user information
   * @param UpdateUserDto - Data transfer object with fields to update
   * @returns Updated user profile
   */
  @Post('update')
  async UpdateUserProfile(@Req() req: AuthenticatedRequest,@Body() UpdateUserDto:UpdateUserDto) {
    return this.userService.UpdateProfile(req,UpdateUserDto);
  }

  /**
   * Endpoint to change user password
   * @param req - Authenticated request with user information
   * @param ChangePasswordDto - Data transfer object with old and new passwords
   * @returns Result of password change operation
   */
  @Post('changepass')
  async UpdatePassword(@Req() req: AuthenticatedRequest,@Body() ChangePasswordDto :ChangePasswordDto) {
    return this.userService.UpdatePassword(req,ChangePasswordDto);
  }

  /**
   * Endpoint to delete user account
   * @param req - Authenticated request with user information
   * @returns Deletion confirmation
   */
  @Delete('delete')
  async deleteuser(@Req() req:AuthenticatedRequest){
    return this.userService.DeleteUser(req);
  }

  /**
   * Endpoint to get a specific user by ID
   * @param req - Authenticated request with user information
   * @param id - User identifier
   * @returns User data for the specified ID
   */
  @Get(':id')
  async findsingleuser(@Req() req:AuthenticatedRequest , @Param('id') id:number){
    return this.userService.GetSingleUser(req,+id);
  }

  /**
   * Endpoint to get all users
   * @param req - Authenticated request with user information
   * @returns Array of all users
   */
  @Get()
  async findallusers(@Req() req:AuthenticatedRequest){
    return this.userService.GetAllUsers(req);
  }
}
