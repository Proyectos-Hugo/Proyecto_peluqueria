import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserAltaDto } from 'src/dto/UserAltaDto';
import { UserService } from 'src/service/user.service';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: UserAltaDto) {
    return this.userService.create(createUserDto);
  }

  @Get('findUser/:email,:password')
  findOne(@Param('email') email: string, @Param('password') password: string) {
    return this.userService.findOne(email, password);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
