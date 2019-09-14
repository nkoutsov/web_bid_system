import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Message } from '../models/message';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  private inbox : any[] // Message[];
  private sent : Message[];
  private flag : string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blservice : MessagingService
  ) { }

  ngOnInit() {
    this.getInboxSent();
    this.route.paramMap.subscribe(params => this.flag = params.get("act"));
  }

  getInboxSent() {
    this.blservice.getInboxMessages().subscribe(inb => {
      this.inbox=inb.results;
      for (var i of this.inbox) {
        if (i.read == false ) {
          i.read = true;
          // update msg
          this.blservice.updateMsg(i).subscribe(data => console.log(data));
        }
      }
    });
    this.blservice.getSentMessages().subscribe(snt => this.sent = snt.results);
  }

  send(message,rec) {
    let msg = {
      text: message,
      receiver: rec
    }
    this.blservice.sendMessage(msg).subscribe(data => console.log(data));
  }



}
