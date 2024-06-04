import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'zakeer' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'zakeer@zakeer.me' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  readonly isPublic: boolean;

  @ApiProperty({ example: 'https://github.com/zakeer' })
  @IsOptional()
  @IsString()
  readonly githubLink?: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'zakeer@zakeer.me' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
