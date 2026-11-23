import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/request/register.dto.js';
import { TokensDto } from './dto/response/tokens.dto.js';
import { EmailAlreadyExistException } from './exceptions/email-already-exist.exception.js';
import { TokenService } from './token.service.js';
import { UserService } from '../user/user.service.js';
import { LoginDto } from './dto/request/login.dto.js';
import { ERROR_MESSAGES } from '../common/constants/error-messages.constants.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async register(dto: RegisterDto): Promise<TokensDto> {
    const existingUser = await this.userService.findByEmail(dto.email);

    if (existingUser) {
      throw new EmailAlreadyExistException();
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    const tokens = await this.tokenService.generateTokens({
      sub: newUser.id,
      email: newUser.email,
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);

    await this.userService.update(newUser.id, { hashedRefreshToken });

    return tokens;
  }

  async login(dto: LoginDto): Promise<TokensDto> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const tokens = await this.tokenService.generateTokens({
      sub: user.id,
      email: user.email,
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);

    await this.userService.update(user.id, { hashedRefreshToken });

    return tokens;
  }

  async logout(userId: string) {
    await this.userService.update(userId, {
      hashedRefreshToken: null,
    });
  }
}
