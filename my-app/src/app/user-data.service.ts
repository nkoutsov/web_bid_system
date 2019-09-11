import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  users = []
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  api = 'http://localhost:8000/';

  addUser(user) {
    this.users.push(user);
  }

  getUsers() : Observable<any>{
    return this.http.get<any>(this.api+'users/?is_active=true&is_staff=false');
  }

  getInactiveUsers(): Observable<any> {
    return this.http.get<any>(this.api+'users/?is_active=false&is_staff=false');
  }

  acceptUser(user : any): Observable<any> {
    return this.http.put<any>(this.api+'users/'+user.id.toString()+"/",user,this.httpOptions);
  }

  getUser(id : any) : Observable<any> {
    return this.http.get<any>(this.api+"users/"+id.toString()+'/');
  }

  createUser(user): Observable<any> {
    return this.http.post(this.api+'users/',user,this.httpOptions);
  }
  
  constructor(
    private http: HttpClient
  ) { }
}
