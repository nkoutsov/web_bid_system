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

    login(username: string, password: string): Observable<any> {
        let ln: Login = { "username": username, "password": password };
        let token = {"token":""};
        console.log(ln);
        return this.http.post<any>("http://localhost:8000/api/token/", ln, {responseType: 'text' as 'json'})
            .pipe(map(token => { 
                let a = JSON.parse(token).token;
                console.log(JSON.parse(token).token)
                localStorage.setItem('token', "token "+a);
                localStorage.setItem('username',ln.username);
                const token_parts = token.split(/\./);
                // console.log(token_parts)
                const token_decoded = JSON.parse(window.atob(token_parts[1]));
                return token;
            }));        
    }

    logout() {
        // remove token from local storage to log user out
        localStorage.removeItem('token');
    }
}