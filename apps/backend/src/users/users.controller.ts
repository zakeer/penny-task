import { Controller, Get, Put, Body, UseGuards, Request, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { API } from '../constants';

@ApiTags(API.USER.TAG)
@Controller(API.USER.PATH)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /*
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: API.USER.MESSAGES.ALL_USERS })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: API.AUTH.MESSAGES.UNAUTHORIZED })
  findAll(@Request() req) {
    return this.usersService.findAll();
  }
  */

  @Get(API.USER.PUBLIC_USERS.PATH)
  @ApiOperation({ summary: API.USER.PUBLIC_USERS.SUMMARY })
  @ApiResponse({ status: HttpStatus.OK, description: API.USER.MESSAGES.ALL_PUBLIC_PROFILES })
  findAllPublic() {
    return this.usersService.findAllPublic();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(API.USER.UPDATE_PROFILE.PATH)
  @ApiBearerAuth()
  @ApiOperation({ summary: API.USER.UPDATE_PROFILE.SUMMARY })
  @ApiResponse({ status: HttpStatus.OK, description: API.USER.MESSAGES.PROFILE_UPDATE_SUCCESS })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: API.AUTH.MESSAGES.USER_NOT_FOUND })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.userId, updateUserDto);
  }
}
