import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { LoginUserDto } from '@app/common';
import { UsersService } from '../users.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  // async validate(request: LoginUserDto) {
  async validate(username: string, password: string) {
    const user = await firstValueFrom(
      this.usersService.loginUser({ username, password }),
    );

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
