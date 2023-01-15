import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { GroupType } from "src/interface/enum";
import { User } from "./user.schema";

export type GroupDocument = Group & Document
@Schema({timestamps: true})
export class Group {
    @Prop({required: true})
    name: string
    @Prop({required: true})
    symbol: string
    @Prop({required: true})
    number: number
    @Prop({required: true})
    groupNum: number
    @Prop({required: true, type: String, enum: GroupType})
    groupType: GroupType
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true})
    admin: User
    @Prop({required: true})
    members: User[]
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'groups'})
    parentId?: Group 

}
export const GroupSchema = SchemaFactory.createForClass(Group)
