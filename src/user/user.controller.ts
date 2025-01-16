import { Controller, Get,Post,Req} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/auth/auth.middleware';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';


@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) {}
  @Get('profile')
  async getUserProfile(@Req() req: AuthenticatedRequest) {
    return this.userService.GetProfileById(req);

}
@Post('update')
async UpdateUserProfile(@Req() req: AuthenticatedRequest,UpdateUserDto:UpdateUserDto) {
  return this.userService.UpdateProfile(req,UpdateUserDto);

}
}
