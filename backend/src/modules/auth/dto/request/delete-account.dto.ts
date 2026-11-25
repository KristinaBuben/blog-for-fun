import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  passwordRegex,
  passwordRegexMessage,
} from '../../../common/constants/regex.constants.js';

export class DeleteAccountDto {
  @ApiProperty({
    example: 'lalala@@@2222Puupuppupupu',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(passwordRegex, { message: passwordRegexMessage })
  password: string;
}
