import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  // @ApiProperty({
  //   example: 'User successfully registered',
  // })
  // message: string;

  // @ApiProperty({
  //   example: '555e0000-e22b-2222222222',
  // })
  // userId: string;

  // @ApiProperty({
  //   example: 'Kristina',
  // })
  // name: string;

  // @ApiProperty({
  //   example: 'user@gmail.com',
  // })
  // email: string;
  @ApiProperty({
    example: 'fhsgrhjwghergw874837djdn...',
  })
  accessToken: string;

  @ApiProperty({
    example: 'grhwghernwn332ndnn4837djdn...',
  })
  refreshToken: string;
}
