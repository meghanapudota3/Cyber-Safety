import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebSocketService } from '../services/web-socket.service';
import { chatMessageDto} from '../models/chatMessageDto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  constructor(public webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
    sendMessage(sendForm: NgForm) {
    const ChatMessageDto= new chatMessageDto (sendForm.value.user, sendForm.value.message);
    this.webSocketService.sendMessage(ChatMessageDto);
    sendForm.controls['message'].reset();
  }
}