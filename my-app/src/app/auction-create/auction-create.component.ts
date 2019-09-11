import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { Auction } from '../models/auction';

@Component({
  selector: 'app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: ['./auction-create.component.css']
})
export class AuctionCreateComponent implements OnInit {
    model: any = {};
  
    map: any;
    auction : Auction;
  
    constructor(
      private auctionService : AuctionService
    ) { console.log("Aa"); }
  
    ngOnInit() {
      this.auction = {
        id: null,
        name: "john2",//this.model.name,
        category: ["1","2"],//this.model.category,
        currently: 1,//this.model.currently,
        buy_price: 1,//this.model.buy_price,
        first_bid: 1,//this.model.first_bid,
        number_of_bids: 1,//this.model.number_of_bids,
        location: null,
        country: "1",//this.model.country,
        started: new Date(),//this.model.started,
        ends: new Date(),//this.model.ends,
        description: "kakakaka"//this.model.description
      };
    }
  
    onSubmit() {
      //alert("oti na nai " + this.model)
      // let auctionService : AuctionService;
      // alert("oti na nai ")
      
      // alert("oti na nai " + auction.category)
  
      // this.model.description = this.model.ends;
      console.log(this.auction);
  
      this.auctionService.postAuction(this.auction).subscribe(data => console.log(data));
    }

  

}
