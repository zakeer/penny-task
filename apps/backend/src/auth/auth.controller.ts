import { Controller, Post, Body, UseGuards, Request, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { API } from '../constants';

@ApiTags(API.AUTH.TAG)
@Controller(API.AUTH.PATH)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /*
  User Registeration API
  */
  @Post(API.AUTH.REGISTER.PATH)
  @ApiOperation({ summary: API.AUTH.REGISTER.SUMMARY })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: API.AUTH.MESSAGES.REGISTER_SUCCESS
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: API.AUTH.MESSAGES.BAD_REQUEST
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  /*
  User Registeration API
  */
  @Post(API.AUTH.LOGIN.PATH)
  @ApiOperation({ summary: API.AUTH.LOGIN.SUMMARY })
  @ApiResponse({
    status: HttpStatus.OK,
    description: API.AUTH.MESSAGES.LOGIN_SUCCESS
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: API.AUTH.MESSAGES.UNAUTHORIZED
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async signin(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signin(loginUserDto);
  }

  /*
  User Forget Password API
  */
  @Post(API.AUTH.FORGET.PATH)
  @ApiOperation({ summary: API.AUTH.FORGET.SUMMARY })
  @ApiResponse({ status: HttpStatus.OK, description: API.AUTH.MESSAGES.RESET_EMAIL_SENT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: API.AUTH.MESSAGES.USER_NOT_FOUND })
  @UsePipes(new ValidationPipe({ transform: true }))
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  /*
  User Reset Password API
  */
  @Post(API.AUTH.RESET_PASSWORD.PATH)
  @ApiOperation({ summary: API.AUTH.RESET_PASSWORD.SUMMARY })
  @ApiResponse({
    status: HttpStatus.OK,
    description: API.AUTH.MESSAGES.PASSWORD_RESET
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: API.AUTH.MESSAGES.INVALID_OR_EXPIRED_TOKEN
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  /*
  User Profile
  */
  @UseGuards(AuthGuard('jwt'))
  @Post(API.AUTH.PROFILE.PATH)
  @ApiBearerAuth()
  @ApiOperation({ summary: API.AUTH.PROFILE.SUMMARY })
  @ApiResponse({
    status: HttpStatus.OK,
    description: API.AUTH.MESSAGES.LOGGED_IN_PROFILE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: API.AUTH.MESSAGES.UNAUTHORIZED
  })
  getProtectedData(@Request() req) {
    return { user: req.user };
  }
}
