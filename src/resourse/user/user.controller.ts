import { Controller, Post, Body, Delete, Get, Query, Put } from "@nestjs/common";

import { ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
import { LoginUser, RegisterUser, UpdateUser } from "./user.dto";
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor (private service: UserService) {}

    @Post('register')
    async register(@Body() dto: RegisterUser) {
        let user = await  this.service.register(dto)
        if(user) {
            const token = await this.service.signPayload(user.email)
            return {user, token}
        }

    }


    @Post('login')
    async login(@Body() dto: LoginUser) {
        let user = await this.service.validateUser(dto.email)
        if(user) {
            const token = await this.service.signPayload(user.email)
            return {user, token}
        }

    }

    @Get()
    async allUsers() {
        return this.service.getAllUsers()
    }

    @Get(':id')
    @ApiQuery({name: 'id'})
    async userById(@Query('id') id:string) {
        return this.service.userById(id)
    }

    @Get(':email')
    @ApiQuery({name: 'email'})
    async userByEmail(@Query('email') email:string) {
        return this.service.userByEmail(email)
    }

    @Put()
    async updateUser(dto: UpdateUser) {
        return this.service.updateUser(dto)
    }

    @Delete()
    async deleteAllUsers() {
        return this.service.deleteAllUsers()
    }

    @ApiQuery({name: 'id'})
    @Delete(':id')
    async deleteUserById(@Query('id') id) {
        return this.service.deleteUserById(id)
    }
}