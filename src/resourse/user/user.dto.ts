import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsNotEmpty, IsArray, IsEmail} from 'class-validator'
export class RegisterUser {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    nickname: string
    
    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    email: string
    
    @IsArray()
    @ApiProperty({
        isArray: true,
    })
    avatars: []
    
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    selectedAvatar: string
    
    @IsArray()
    @ApiProperty({
        isArray: true,
    })
    groups: []
    
    @IsArray()
    @ApiProperty({
        isArray: true,
    })
    teams: []
    
}

export class LoginUser {
    @IsEmail()
    @ApiProperty()
    email: string
}
export class UpdateUser {

    @ApiProperty()
    nickname: string
    
    @ApiProperty()
    id: string
    
    @ApiProperty()

    email: string
    

    @ApiProperty()
    avatars: string
    
    @ApiProperty()
    selectedAvatar: string
    
    
}