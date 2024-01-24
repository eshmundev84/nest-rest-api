import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AbstractDocument} from "../../../shared/schemas/abstract.document";

@Schema({
    collection: 'users',
    timestamps: true,
    versionKey: false
})
export class UserDocument extends AbstractDocument{
    @Prop({type: String, required: true, index: true})
    firstName: string;

    @Prop({type: String, required: true})
    lastName: string;

    @Prop({type: String, unique: true, index: true})
    email: string;

    @Prop({type: String, required: true, select: false})
    password: string;

    @Prop({type: Number, unique: true, index: true})
    dni: number;

    @Prop({type: Number})
    phoneNumber: number;

    @Prop({type: String})
    address: string;

    @Prop({type: String, default: 'user-img.jpg'})
    image: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);