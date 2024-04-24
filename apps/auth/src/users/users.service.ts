import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto,
  LoginUserResponse,
} from '@app/common/types/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  // onModuleInit() {
  //   for (let i = 0; i <= 100; i++) {
  //     this.create({ username: randomUUID(), password: randomUUID() });
  //   }
  // }

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    // const user: User = {
    //   ...createUserDto,
    //   id: randomUUID(),
    // };
    // this.users.push(user);
    // return user;

    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    // return { users: this.users };

    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    // return this.users.find((user) => user.id === id);

    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return updatedUser.raw;
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
    if (!loginUserDto.username || !loginUserDto.password) {
      throw new Error('Username and password are required');
    }

    const userExists = await this.userRepository.findOneBy({
      username: loginUserDto.username,
      password: loginUserDto.password,
    });

    if (!userExists) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      id: userExists.id,
      username: userExists.username,
    });

    return {
      username: userExists.username,
      token,
    };
  }
}
