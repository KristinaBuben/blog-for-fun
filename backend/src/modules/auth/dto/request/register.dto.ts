import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  emailRegex,
  emailRegexMessage,
  nameRegex,
  nameRegexMessage,
  passwordRegex,
  passwordRegexMessage,
} from '../../../common/constants/regex.constants.js';

export class RegisterDto {
  @ApiProperty({
    example: 'Kristina',
    description: 'User name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(nameRegex, { message: `Name ${nameRegexMessage}` })
  name: string;

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
