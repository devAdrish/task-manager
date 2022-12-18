import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(data: AuthCredentialsDto): Promise<void> {
    const { email, password } = data;
    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('User already exists');

      throw new InternalServerErrorException();
    }
  }

  async signIn(data: AuthCredentialsDto): Promise<string> {
    const { email, password } = data;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) return user.email;
    return null;
  }
}
