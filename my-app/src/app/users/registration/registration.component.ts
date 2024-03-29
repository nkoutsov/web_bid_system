import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  myform;
  private valid;

  constructor(
    private userService : UserDataService,
    private formBuilder : FormBuilder
  ) {
    this.myform = this.formBuilder.group({
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      location: '',
      afm: '',
      country:''
    });
   }

  ngOnInit() {
    this.valid = true;
  }

  onSubmit(data) {
    let user : any = {
      username : data.username,
      password : data.password,
      email : data.email,
      address : data.location,
      first_name : data.first_name,
      last_name : data.last_name,
      phone : data.phone,
      afm : data.afm,
      is_active : false,
      is_staff : false,
      sent : [],
      auctions : [],
      inbox : [],
      location : data.location,
      country : data.country
    };
    console.log(user);
    this.userService.validateUsername(user.username).subscribe(data => {
      if (data == 'True'){
        this.userService.createUser(user).subscribe();
        this.valid = true;
      }
      else this.valid = false;
    })

    

  }



}
