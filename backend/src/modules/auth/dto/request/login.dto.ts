import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  emailRegex,
  emailRegexMessage,
  passwordRegex,
  passwordRegexMessage,
} from '../../../common/constants/regex.constants.js';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User email address',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @Matches(emailRegex, { message: emailRegexMessage })
  email: string;

  @ApiProperty({
    example: 'Zaq1@Xsw2!',
    description: 'User password (8-25 characters)',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: passwordRegexMessage })
  password: string;
}
