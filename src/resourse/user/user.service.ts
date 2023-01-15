import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { sign } from "jsonwebtoken";
import mongoose, { Model } from "mongoose";
import appConfig from "src/config/app.config";
import { Group, GroupDocument, User, UserDocument } from "src/schema";
import { RegisterUser, UpdateUser } from "./user.dto";
import * as bcrypt from 'bcrypt'
@Injectable()

export class UserService {
    constructor (@InjectModel(User.name) private model: Model<UserDocument>, @InjectModel(Group.name) private groupModel: Model<GroupDocument>) {}
    async register(dto: RegisterUser) {
        let user = await this.model.findOne({email: dto.email})
        if(user) throw new HttpException('user registered', HttpStatus.FOUND)
        user = await this.model.create({
            email: dto.email,
            nickname: dto.nickname,
            avatars: dto.avatars,
            selectedAvatar: dto.selectedAvatar,
            groups: dto.groups,
            teams: dto.teams,
        
        })
        return user
    }

    
    async validateUser(payload: string) {
        return await this.model.findOne({ email: payload });
      }
      async signPayload(payload) {
        return sign({ email: payload }, appConfig().appSecret, {
          expiresIn: 60 * 60 * 24,
        });
      }
    async getAllUsers() {
        let user = await this.model.find()
        if(!user) throw new HttpException('not user', HttpStatus.FORBIDDEN)
        return user
    }

    async getGroupsByUser(email: string) {
        let user = await this.userByEmail(email)
        let groups =  user.groups?.map(async (g) => await this.groupModel.findById(g))
        let teams =  user.teams?.map(async (t) => await this.groupModel.findById(t))
        return {groups, teams}
    }
    
    async userById(id: string) {
        let user = await this.model.findById(id)
        if(!user) throw new HttpException('not user', HttpStatus.FORBIDDEN)
        return user
    }
    
    async userByEmail(email: string)  {
        let user = await this.model.findOne({email})
        if(!user) throw new HttpException('not user', HttpStatus.FORBIDDEN)
        return user
    }

    async updateUser(dto: UpdateUser) {
        let user  = await this.model.findByIdAndUpdate(dto.id, {
                nickname: dto.nickname,
                selectedAvatar: dto.selectedAvatar,
                $push: {avatars: dto.avatars}
            })
        return user
        
    }
    
    async deleteAllUsers() {
        return  await this.model.deleteMany()
    }

    async deleteUserById(id:string) {
        let user = await this.model.findByIdAndRemove(id)
        return user
    }
}