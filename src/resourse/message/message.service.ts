import { Injectable, } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "src/schema";
import { CreateMessageDto } from "./message.dto";

@Injectable()

export class MessageService {
    constructor(@InjectModel(Message.name) private model: Model<MessageDocument>) {}

    async createMessage(dto: CreateMessageDto , userId: string) {
        let message = await this.model.create({
            message: dto.message,
            userId: userId,
            groupId: dto.groupId,
            parentId: dto.parentId
        })
        return message 
    }

    async getAllMessage() {
        let messages = await this.model.find()
        return messages
    }
    

    async getMessages(groupId: string) {
        let messages = await this.model.find({groupId: groupId})
        return messages
    }

    async deleteAllMessage() {
        let messages =  this.model.deleteMany()
        return messages
    }
}
