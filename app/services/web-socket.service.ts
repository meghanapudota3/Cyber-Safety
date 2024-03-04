import { Injectable } from '@angular/core';
import { chatMessageDto } from '../models/chatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket:WebSocket;
  chatMessages:chatMessageDto[]=[];
  constructor() { }

  public openWebSocket(){
    this.webSocket=new WebSocket('ws://localhost:8080/dashboard');

    this.webSocket.onopen= (event)=>{
      console.log('open:',event)
    };
    this.webSocket.onmessage = (event) =>{
     const chatMessageDto= JSON.parse(event.data);
     this.chatMessages.push(chatMessageDto);
    };
    this.webSocket.onclose = (event) =>{
      console.log('close:',event);
    };
 }

 public sendMessage(chatMessageDto:chatMessageDto){
  this.webSocket.send(JSON.stringify(chatMessageDto));
 }
 public closeWebSocket(){
  this.webSocket.close();
 }
}