import { Body, Controller, Post, Get, Delete, UseGuards, Request, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserAccessGuard } from "src/guard/user.guard";
import { CreateMessageDto } from "./message.dto";
import { MessageService } from "./message.service";

@Controller('message')
@ApiTags('Message')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class MessageController {
    constructor (private service: MessageService) {}

    @Post()
    createMessage(@Request() {user}, @Body() dto: CreateMessageDto) {
        return this.service.createMessage(dto, user)
    }

    @Get()
    getAllMessage() {
        return this.service.getAllMessage()
    }
    @Get(":id")
    @ApiQuery({name: 'id'})
    getMessages(@Query('id') id: string) {
        return this.service.getMessages(id)
    }

    @Delete()
    deleteAllMessage() {
        return this.service.deleteAllMessage()
    }
}