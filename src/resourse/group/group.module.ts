import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Group, GroupSchema, User, UserSchema } from "src/schema";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";

@Module({
imports: [MongooseModule.forFeature([{name: Group.name, schema: GroupSchema}, {name: User.name, schema: UserSchema}])],
controllers: [GroupController],
providers: [GroupService],
exports: [GroupService]
}) 

export class GroupModule {}