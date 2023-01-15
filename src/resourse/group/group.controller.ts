import { Body, Controller, Post, Get, Query, Put, Delete, UseGuards, Request, HttpException, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserAccessGuard } from "src/guard/user.guard";
import { CreateGroupDto, GroupMember, GroupSearch, UpdateGroupDto } from "./group.dto";
import { GroupService } from "./group.service";

@Controller('group')
@ApiTags('Group')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class GroupController {
    constructor (private service: GroupService) {}
    @Post()
    createGroup(@Request() {user}, @Body() dto: CreateGroupDto) {
        if (!user) throw new HttpException("UNAUTHORIZATION_ERROR", HttpStatus.UNAUTHORIZED)
        return this.service.createGroup(dto, user)
    }

  
    @Get()
    getAllGroup() {
        return this.service.getAllGroups()
    }

    @Post('addMember')
    addMemberToGroup(@Request() {user},@Body() dto:GroupMember) {
        return this.service.addMemberToGroup(dto.id, user)
    }

    @Post('search')
    filterGroup(@Body() dto: GroupSearch) {
        return this.service.filterGroup(dto.value)
    }

    @Put()
    updateGroup(@Body() dto: UpdateGroupDto) {
        return this.service.updateGroup(dto)
    }

    @Delete(':id')
    @ApiQuery({name: 'id'})
    deleteGroupById(@Query('id') id: string) {
        return this.service.deleteGroup(id)
    }

    

}