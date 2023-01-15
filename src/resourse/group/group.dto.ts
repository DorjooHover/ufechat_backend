import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsNotEmpty, IsNumber, IsEnum, IsArray} from 'class-validator'
import { GroupType } from 'src/interface/enum'

export class CreateGroupDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    symbol: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number})
    number: string
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number})
    groupNum: string

    @IsNotEmpty()
    @ApiProperty({
        required: true,
        enum: GroupType
    })
    @IsEnum(GroupType)
    groupType: GroupType

    @ApiProperty()
    @IsArray()
    members: string[]

    @ApiProperty()
    parentId?: string

}

export class UpdateGroupDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string
    
    @ApiProperty()
    name: string

    @ApiProperty()
    symbol: string

    @ApiProperty({type: Number})
    number: string
    
    @ApiProperty({type: Number})
    groupNum: string
    
}

export class GroupMember {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string
}

export class GroupSearch {
    

    @ApiProperty()
    value: string
}