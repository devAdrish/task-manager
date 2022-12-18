import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload, JwtToken } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.repository.signUp(dto);
  }

  async signIn(dto: AuthCredentialsDto): Promise<JwtToken> {
    const email = await this.repository.signIn(dto);
    if (!email) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = { email };
    return { token: this.jwtService.sign(payload) };
  }
}
