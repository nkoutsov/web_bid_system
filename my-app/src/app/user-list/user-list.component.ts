import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private users: User[] ;
  res = {
    results:''
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserDataService
    ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {this.users = users.results;});
    // console.log(this.users);
  }

}
