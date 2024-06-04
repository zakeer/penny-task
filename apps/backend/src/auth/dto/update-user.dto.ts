import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  readonly isPublic: boolean;

  @ApiProperty({ example: 'https://github.com/zakeer' })
  @IsOptional()
  @IsString()
  readonly githubLink?: string;
}
