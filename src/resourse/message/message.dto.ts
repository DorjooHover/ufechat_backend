import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class CreateMessageDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    message: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    groupId: string

    @ApiProperty()
    parentId: string
    
}