import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Group, GroupDocument, UserDocument, User } from "src/schema";
import { CreateGroupDto, UpdateGroupDto } from "./group.dto";

@Injectable()
export class GroupService {
    constructor (@InjectModel(Group.name) private model: Model<GroupDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {}
    async createGroup(dto: CreateGroupDto, adminId: string) {
        let group = await this.model.findOne({$and: [{name: dto.name}, {groupNum: dto.groupNum}]})
        if(group) throw new HttpException('error created this group', HttpStatus.FOUND)
        group = await this.model.create({
            name: dto.name,
            groupNum: dto.groupNum,
            groupType: dto.groupType,
            symbol: dto.symbol,
            members: dto.members,
            number: dto.number,
            parentId: dto.parentId ?? null,
            admin: adminId
        })
         if(group.parentId == null) {
            await this.userModel.findByIdAndUpdate(adminId, {
                $push: {teams: group._id}
            })
         }
        return group
    }

    async getAllGroups() {
        let groups = await this.model.find() 
        if(!groups) throw new HttpException('not found groups', HttpStatus.FORBIDDEN)
        return groups
    }

    async addMemberToGroup(id: string, userId: string) {
        let user = await this.model.findOne({members: {$in: [userId]}})
        if(user) throw new HttpException('registerd user', HttpStatus.FOUND)
        let group = await this.model.findByIdAndUpdate(id, {
            $push: {members: userId }
        } )
        return group
    }

    async filterGroup(value: string) {
        let group  = await this.model.find({name: {$regex: value}})
        return group
    }

    async updateGroup(dto: UpdateGroupDto) {
        let group = await this.model.findByIdAndUpdate(dto.id, {
            name: dto.name,
            symbol: dto.symbol,
            number : dto.number,
            groupNum: dto.groupNum
        })
        return group
    }
    async deleteGroup(id: string) {
        return await this.model.findByIdAndRemove(id)
    }

    
}