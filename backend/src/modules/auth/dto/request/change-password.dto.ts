import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  passwordRegex,
  passwordRegexMessage,
} from '../../../common/constants/regex.constants.js';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'Zaq1@Xsw2!',
    description: 'User current password (8-25 characters)',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: passwordRegexMessage })
  currentPassword: string;

  @ApiProperty({
    example: 'Zaq1@5555Xsw2!',
    description: 'User new password (8-25 characters)',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: passwordRegexMessage })
  newPassword: string;
}
