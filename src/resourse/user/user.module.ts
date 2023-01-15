import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Group, GroupSchema, User, UserSchema } from "src/schema";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Global()
@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Group.name, schema: GroupSchema}])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
    
})
export class UserModule {}