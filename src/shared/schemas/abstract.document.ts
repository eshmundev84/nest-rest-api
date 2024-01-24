import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {SchemaTypes, Types} from "mongoose";

@Schema()
export class AbstractDocument {
    @Prop({ type: SchemaTypes.ObjectId })
    id: Types.ObjectId;

    @Prop({default: true})
    active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(AbstractDocument);