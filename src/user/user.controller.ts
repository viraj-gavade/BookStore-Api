import { Body, Controller, Get,Post,Req} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { ChangePasswordDto } from './dto/chnage-password-dto';


@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) {}
  @Get('profile')
  async getUserProfile(@Req() req: AuthenticatedRequest) {
    return this.userService.GetProfileById(req);

} 
@Post('update')
async UpdateUserProfile(@Req() req: AuthenticatedRequest,@Body() UpdateUserDto:UpdateUserDto) {
  return this.userService.UpdateProfile(req,UpdateUserDto);

}


@Post('changepass')
async UpdatePassword(@Req() req: AuthenticatedRequest,@Body() ChangePasswordDto :ChangePasswordDto) {
  return this.userService.UpdatePassword(req,ChangePasswordDto);
}
}
