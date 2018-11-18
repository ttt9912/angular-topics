import {Component, OnInit} from '@angular/core';
import {MessageService} from "../message/message.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // messageService must be public because the template will bind to it
  constructor(public messageService: MessageService) {
  }

  ngOnInit() {
  }

}
