import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Group } from "./group.schema";
import { User } from "./user.schema";

export type MessageDocument = Message & Document
@Schema({timestamps: true})
export class Message {
    @Prop({required: true})
    message: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'groups', required: true})
    groupId: Group
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true})
    userId: User
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'messages'})
    parentId?: Message 

}
export const MessageSchema = SchemaFactory.createForClass(Message)
