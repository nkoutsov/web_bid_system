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

  api = 'http://127.0.0.1:8000/';

  addUser(user) {
    this.users.push(user);
  }

  getUsers() : Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/active/');
  }

  getInactiveUsers(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/inactive/');
  }

  acceptUser(user : User): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/users/'+user.id.toString()+"/",user,this.httpOptions);
  }

  getUser(id : any) : Observable<any> {
    return this.http.get<any>(this.api+"users/"+id.toString()+'/');
  }





  constructor(
    private http: HttpClient
  ) { }
}
