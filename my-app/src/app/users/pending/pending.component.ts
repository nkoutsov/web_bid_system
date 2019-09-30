import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserDataService } from '../../services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  private users: User[] ;

  constructor(
    private route: ActivatedRoute,
    private userService: UserDataService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getInactiveUsers().subscribe(users => this.users = users.results);
  }

  goBack(): void {
    this.location.back();
  }

  accept(user : User): void {
    user.is_active = true;
    this.userService.acceptUser(user).subscribe(() => this.goBack());
    
  }

}
