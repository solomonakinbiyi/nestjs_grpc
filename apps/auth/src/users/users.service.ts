import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';

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
}
