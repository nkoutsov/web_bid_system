import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  api = 'http://localhost:8000/';

  getInboxMessages(): Observable<any> {
    return this.http.get<any>(this.api+'messages/inbox/');
  }

  getSentMessages(): Observable<any> {
    return this.http.get<any>(this.api+'messages/sent/');
  }

  sendMessage(msg) : Observable<any> {
    return this.http.post(this.api+"messages/sent/",JSON.stringify(msg),this.httpOptions);
  }

  updateMsg(msg) : Observable<any> {
    return this.http.put(this.api+'message/'+msg.id+'/',JSON.stringify(msg),this.httpOptions);
  }

  deleteMessage(id) : Observable<any> {
    return this.http.delete(this.api+"message/"+id +"/");
  }

  // sendMessage(text:string, receiver: User) : Observable<any> {
  //   let message : Message = {"text":text,"receiver":receiver};
  //   return this.http.post<any>(this.api+'messages/new/',message,this.httpOptions);
  // }


  constructor(
    private http: HttpClient
  ) { }
}
