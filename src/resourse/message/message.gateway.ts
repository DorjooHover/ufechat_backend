import { InjectModel } from '@nestjs/mongoose';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
import { Model } from 'mongoose';
  import { Server } from 'socket.io';
import { Message, MessageDocument } from 'src/schema';
  
  @WebSocketGateway({
    cors: {
      origin: '<http://192.168.1.49:19000>',
    },
  })
  export class MessageGateway {
    constructor(@InjectModel(Message.name) private model: Model<MessageDocument> ) {}
    @WebSocketServer()
    server: any = {
      emit: (event: string, data: any) => {
        console.log(event, data)
        return data
      },
      to: (data: string) => {
        console.log(data)
        return {
          emit: (event: string, data:any) => {
            console.log(event, data)
            return data
          }
        }
      }
    };
    async onApplicationBootstrap() {
        this.model.watch().on("change", async (data : any)  => {
            switch(data.operationType) {
              case 'insert':
                this.server.emit('group message', data.fullDocument)
                break
            }
            // console.log(data?.documentKey)
        })
    }
    
  }
  