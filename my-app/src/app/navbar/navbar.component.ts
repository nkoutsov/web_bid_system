import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  unread : number;

  constructor(
    private msgService: MessagingService
  ) { }

  ngOnInit() {
    if( localStorage.getItem('token'))
      this.getUnreadMsg();
  }

  getUnreadMsg() {
    this.msgService.getInboxMessages().subscribe(data => {
      let inbox = data.results;
      let count = 0;
      for (var i of inbox) {
          if (i.read == false) count += 1;
      }
      this.unread = count;

    })
  }


}
