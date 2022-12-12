import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { RidesService } from './rides.service';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RidesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly ridesService: RidesService) { }

  @WebSocketServer()
  server: Server

  afterInit() {
    console.log("Rides Innitialized");
  }

  handleConnection(client: Socket, payload: any) {
    console.log(client.id);
    console.log("connected");
  }

  handleDisconnect(client: Socket) {
    console.log(client.id);
    console.log("disconnected");
  }

  @SubscribeMessage('start-ride')
  startRide(@MessageBody() obj: any, @ConnectedSocket() client: Socket) {
    client.join(obj.ride_id);
    console.log("start-ride", client.id, obj);
    return client.id;
  }

  @SubscribeMessage('picked-up')
  pickedUp(@MessageBody() obj: any, @ConnectedSocket() client: Socket) {
    client.to(obj.ride_id).emit('passangers-picked', obj);
  }

  @SubscribeMessage('send-coordinates')
  sendCordinates(@MessageBody() obj: any, @ConnectedSocket() client: Socket) {
    console.log("send-coordinates", client.id, obj);
    client.to(obj.ride_id).emit('get-coordinates', obj);
  }

  @SubscribeMessage('end-ride')
  endRide(@MessageBody() obj: any, @ConnectedSocket() client: Socket) {
    console.log("end-ride", client.id, obj);
    client.to(obj.ride_id).emit('ride-ended', obj);
  }

}
