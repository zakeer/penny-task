import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';
import { API, AUTH } from '../constants';
import resetPasswordTemplate from '../email/templates/resetPasswordTemplate';
import { comparePassword, hashPassword } from '../utils/password.utils';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) { }

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) throw new BadRequestException(API.AUTH.MESSAGES.ALREADY_REGISTER);
    const hashedPassword = await hashPassword(createUserDto.password);
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async signin({ email, password }: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await comparePassword(password, user.password))) {
      const payload = { email: user.email, sub: user._id };
      return {
        accessToken: this.jwtService.sign(payload, { expiresIn: AUTH.EXPIRES_IN }),
      };
    }
    throw new UnauthorizedException(API.AUTH.MESSAGES.INVALID_CREDENTIALS);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new NotFoundException(API.AUTH.MESSAGES.USER_NOT_FOUND);
    }

    const resetToken = crypto.randomBytes(AUTH.TOKEN_BYTES).toString(AUTH.TOKEN_TYPE as BufferEncoding);
    const resetPasswordExpires = Date.now() + AUTH.TOKEN_EXPIRES_IN

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    const resetUrl = `${API.HOST_URL}/${API.AUTH.RESET_PASSWORD.PATH}?${API.AUTH.RESET_PASSWORD.PARAMS.TOKEN}=${resetToken}`;
    const mailText = resetPasswordTemplate(resetUrl);

    await this.emailService.sendMail(user.email, API.AUTH.RESET_PASSWORD.SUMMARY, mailText);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const user = await this.usersService.findByResetPasswordToken(resetPasswordDto.resetToken);
    if (!user || user.resetPasswordExpires < Date.now()) {
      throw new UnauthorizedException(API.AUTH.MESSAGES.INVALID_OR_EXPIRED_TOKEN);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  }
}
