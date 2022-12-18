import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { JwtToken } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<JwtToken> {
    return this.authService.signIn(dto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() res) {
    return res;
  }
}
