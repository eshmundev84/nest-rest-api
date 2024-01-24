import {Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {IUserRepository} from "./iuser-repository";
import {UserDocument} from "./models/user.document";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
      @Inject('IUserRepository')
      private userRepository: IUserRepository,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userRepository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string): Promise<UserDocument> {
    return this.userRepository.delete(id);
  }
}
