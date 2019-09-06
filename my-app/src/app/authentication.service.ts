import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login } from './models/login';
import { Observable }  from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<string> {
        let ln: Login = { "username": username, "password": password };
        return this.http.post<string>("http://127.0.0.1:8000/api/token/", ln, {responseType: 'text' as 'json'})
            .pipe(map(token => { 
                localStorage.setItem('token', token);
                localStorage.setItem('username',ln.username);
                console.log(token);
                // console.log(token.username)
                return token;
            }));
    }

    logout() {
        // remove token from local storage to log user out
        localStorage.removeItem('token');
    }
}