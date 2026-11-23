import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/request/register.dto.js';
import { ERROR_MESSAGES } from '../common/constants/error-messages.constants.js';
import { API_OPERATION_DESCRIPTIONS } from '../common/constants/api-operation-description.js';
import { TokensDto } from './dto/response/tokens.dto.js';
import { LoginDto } from './dto/request/login.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

export interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
  };
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: API_OPERATION_DESCRIPTIONS.REGISTER_USER_SUMMARY,
    description: API_OPERATION_DESCRIPTIONS.REGISTER_USER_DESCRIPTION,
  })
  @ApiCreatedResponse({
    description: API_OPERATION_DESCRIPTIONS.REGISTERED_USER,
    type: TokensDto,
  })
  @ApiBadRequestResponse({
    description: ERROR_MESSAGES.INVALID_DATA,
  })
  @ApiConflictResponse({
    description: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
  })
  async register(@Body() dto: RegisterDto): Promise<TokensDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: API_OPERATION_DESCRIPTIONS.REGISTER_USER_SUMMARY,
    description: API_OPERATION_DESCRIPTIONS.LOGIN_DESCRIPTION,
  })
  @ApiOkResponse({
    description: API_OPERATION_DESCRIPTIONS.AUTHENTICATED_USER,
    type: TokensDto,
  })
  @ApiUnauthorizedResponse({
    description: ERROR_MESSAGES.INVALID_CREDENTIALS,
  })
  async login(@Body() dto: LoginDto): Promise<TokensDto> {
    return this.authService.login(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: API_OPERATION_DESCRIPTIONS.LOGOUT_USER_SUMMARY,
    description: API_OPERATION_DESCRIPTIONS.LOGOUT_USER_DESCRIPTION,
  })
  @ApiOkResponse({
    description: API_OPERATION_DESCRIPTIONS.LOGGED_OUT_USER,
  })
  @ApiUnauthorizedResponse({
    description: ERROR_MESSAGES.UNAUTHORIZED,
  })
  async logout(@Req() req: AuthenticatedRequest): Promise<void> {
    await this.authService.logout(req.user.sub);
  }
}
