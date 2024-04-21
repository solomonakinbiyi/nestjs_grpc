import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserServiceController,
  CreateUserDto,
  UpdateUserDto,
  User,
  Users,
  UserServiceControllerMethods,
  FindOneUserDto,
  LoginUserDto,
  LoginUserResponse,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}
  loginUser(
    request: LoginUserDto,
  ):
    | LoginUserResponse
    | Observable<LoginUserResponse>
    | Promise<LoginUserResponse> {
    return this.usersService.loginUser(request);
  }
  createUser(request: CreateUserDto): User | Promise<User> | Observable<User> {
    return this.usersService.create(request);
  }
  async findAllUsers(): Promise<Users> {
    const users = await this.usersService.findAll();
    return { users };
  }
  findOneUser(
    request: FindOneUserDto,
  ): User | Promise<User> | Observable<User> {
    return this.usersService.findOne(request.id);
  }
  updateUser(request: UpdateUserDto): User | Promise<User> | Observable<User> {
    return this.usersService.update(request.id, request);
  }
  async removeUser(request: FindOneUserDto): Promise<User> {
    const user = await this.usersService.findOne(request.id);
    await this.usersService.remove(request.id);
    return user;
  }
}
