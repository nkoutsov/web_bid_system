import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Auction } from './models/auction'

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  auctions = []

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  api = 'http://127.0.0.1:8000/';

  getAuctions() : Observable<any> {
    return this.http.get<any>(this.api+"bids/");
  }

  getAuction(id) : Observable<any> {
    return this.http.get<any>(this.api+"bids/"+id+"/");
  }

  testToken(): Observable<any> {
    return this.http.post(this.api+'api/token/',{'username' : 'admin', 'password':'root'}, this.httpOptions);
  }

  postAuction(auction : Auction): Observable<any> {
    return this.http.post<Auction>(this.api + 'bids/', auction, this.httpOptions);
  }

  constructor(private http: HttpClient) { }
}
