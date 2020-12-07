import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators   } from '@angular/forms';
import * as io from 'socket.io-client'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket = io.io()
  constructor() { }
  chats : any
  messages = new FormGroup({
    user : new FormControl('',Validators.required),
    data : new FormControl('',Validators.required)
  })
  onSend(){
    if (this.messages.valid){
      // console.log(this.messages.value)
      this.socket.emit('message',this.messages.value)
    }
    else{
      console.log('Nothing to send')
    }
    
  }

  ngOnInit(): void {
    this.socket.on('chat',(data)=>{
      this.chats = data
      // console.log(this.chats)
    })   
  }
}
