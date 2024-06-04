import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'zakeer@zakeer.me' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'newpassword123' })
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;

  @ApiProperty({ example: 'reset-token' })
  @IsNotEmpty()
  @IsString()
  readonly resetToken: string;
}
