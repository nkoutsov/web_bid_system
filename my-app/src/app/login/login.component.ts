import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormsModule } from '@angular/forms'; 
import { UserDataService } from '../user-data.service';

@Component({
    // moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    username: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserDataService
    ) { }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/create';
        
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => { 
                    this.router.navigate([this.returnUrl]); 
                    let id : number = +localStorage.getItem('id');
                    this.getUser(id);
                    
                }
            );
    }

    getUser(id) {
        this.userService.getUser(id).subscribe(user => {
            localStorage.setItem("is_active",user.is_active);
            alert(localStorage.getItem("is_active"));
        });
    }


    logout() {
        this.authenticationService.logout() //.subscribe(data =>console.log(data));
        // alert("OK");
    }
}
