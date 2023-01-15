import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "src/schema";
import { MessageController } from "./message.controller";
import { MessageGateway } from "./message.gateway";
import { MessageService } from "./message.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}])],
    controllers: [MessageController],
    providers:[MessageService, MessageGateway]
})
export class MessageModule {}