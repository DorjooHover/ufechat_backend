import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './resourse/user/user.module';
import { GroupModule } from './resourse/group/group.module';
import { MessageModule } from './resourse/message/message.module';
@Module({
  imports: 
  
  [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    }),
    MongooseModule.forRoot( appConfig().dbUrl, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      dbName: appConfig().dbName
    }),
    UserModule, GroupModule, MessageModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
