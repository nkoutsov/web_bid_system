import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  unread : number;
  loggedin : boolean;
  admin: boolean;

  constructor(
    private msgService: MessagingService,
    private authenticationService: AuthenticationService,
    private router : Router
  ) { }

  ngOnInit() {
    if( localStorage.getItem('token')){
      this.getUnreadMsg();
      this.loggedin = true;
    }

    if (localStorage.getItem('admin'))
      this.admin=true;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auctions']);
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
