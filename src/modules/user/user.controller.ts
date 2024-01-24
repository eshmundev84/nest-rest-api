import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserDocument} from "./models/user.document";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  async findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  async findById(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findById(id);
  }

  @Get(':email')
  @HttpCode(HttpStatus.FOUND)
  async findByIdEmail(@Param('email') email: string): Promise<UserDocument> {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.delete(id);
  }
}
