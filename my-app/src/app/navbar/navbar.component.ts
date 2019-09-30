import { Component, OnInit, Input, Output, AfterViewInit, OnChanges, EventEmitter } from '@angular/core';
import { MessagingService } from '../services/messaging.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  unread: number;
  loggedin: boolean;
  admin: boolean;

  @Input() test: string = null;
 @Output() yell: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private msgService: MessagingService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.test)
    this.yell.emit(true)
    if (localStorage.getItem('token')) {
      this.getUnreadMsg();
      this.loggedin = true;
    }

    if (localStorage.getItem('admin'))
      this.admin = true;
  }

  ngAfterViewInit() {
    console.log(this.test)
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
