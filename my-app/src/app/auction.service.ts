import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Auction } from './models/auction';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  auctions = []

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  api = 'http://localhost:8000/';

  getAuctions() : Observable<any> {
    return this.http.get<any>(this.api+"bids/");
  }
  getMyAuctions() : Observable<any> {
    return this.http.get<any>(this.api+"myauctions/");
  }

  getAuction(id) : Observable<any> {
    return this.http.get<any>(this.api+"bids/"+id+"/");
  }

  // getMyAuction() : Observable<any> {
  //   return 
  // }

  placeBid(bid) : Observable<any> {
    return this.http.post(this.api+'bidds/',JSON.stringify(bid),this.httpOptions);
  }

  getBids(id) : Observable<any> {
    return this.http.get(this.api+'bids/detail/?a='+id,this.httpOptions);
  }

  searchAuction(category : string, price : string,description:string, location:string) : Observable<any> {
    let url : string = this.api+'bids/';
    // if (category==null) category = '';
    if (price==null) price='';
    if (description==null) description='';
    if (location==null) location='';


    // url += '?category='+category+"&max_price="+price+'&description='+description+'&location='+location;
    url += "?max_price="+price+'&description='+description+'&location='+location;
    if(category!=null && category!= "") url += "&category="+category;



    return this.http.get<any>(url);    
  }

  postAuction(auction : Auction): Observable<any> {
    return this.http.post(this.api + 'bids/', JSON.stringify(auction), this.httpOptions)
                  .pipe(map(data => console.log(data)));
  }

  updateAuction(auction : Auction) : Observable<any> {
    return this.http.put(this.api+'bids/'+auction.id+'/',JSON.stringify(auction),this.httpOptions);
  }

  constructor(private http: HttpClient) { }
}
