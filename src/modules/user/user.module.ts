import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {UserRepository} from "./user.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {UserDocument, UserSchema} from "./models/user.document";

@Module({imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository
    },
      UserService
  ],
})
export class UserModule {}
