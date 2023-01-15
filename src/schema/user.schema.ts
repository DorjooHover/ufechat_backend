import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Group } from "./group.schema";
import { UserType } from "src/interface/enum";
export type UserDocument = User & Document
@Schema({timestamps: true})
export class User {
    @Prop({required: true})
    email: string
    @Prop({required: true})
    nickname: string

    @Prop()
    avatars?: []
    @Prop({required: true})
    selectedAvatar: string

    @Prop({ type: String, enum: UserType})
    userType: UserType

    @Prop()
    groups: Group[]
    @Prop()
    teams: Group[]
}
export const UserSchema = SchemaFactory.createForClass(User)
