import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Logger} from "@nestjs/common";
import {IUserRepository} from "./iuser-repository";
import {UserModule} from "./user.module";
import {UserDocument} from "./models/user.document";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

export class UserRepository implements IUserRepository {
    protected readonly logger = new Logger(UserModule.name);

    constructor(
        @InjectModel(UserDocument.name) protected readonly userModel: Model<UserDocument>
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        return this.userModel.create(createUserDto);
    }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find();
    }

    async findById(id: string): Promise<UserDocument> {
        return this.userModel.findById({_id: id}, {}, {lean: true});
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({email: email}, {}, {lean: true});
    }

    async update(id: string, userUpdateDto: UpdateUserDto): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate({_id: id}, userUpdateDto, { lean: true, new: true });
    }

    async delete(id: string): Promise<UserDocument> {
        return this.userModel.findByIdAndDelete({_id: id}, {lean: true});
    }

}