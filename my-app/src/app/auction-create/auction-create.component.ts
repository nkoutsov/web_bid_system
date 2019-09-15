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
    auction : any;
  
    constructor(
      private auctionService : AuctionService
    ) { console.log("Aa"); }
  
    ngOnInit() {
      
    }
  
    onSubmit() {
      // let auctionService : AuctionService;      
      // this.model.description = this.model.ends;
      this.auction = {
        active:false,
        name: this.model.name,
        category: this.model.category,
        buy_price: this.model.buy_price,
        first_bid: this.model.first_bid,
        number_of_bids: this.model.number_of_bids,
        location: this.model.location,
        country: this.model.country,
        started: new Date(),//this.model.started,
        ends: this.model.ends,
        description: this.model.description,
        winner:null
      };
      console.log(this.auction);
  
      this.auctionService.postAuction(this.auction).subscribe(data => console.log(data));
    }

  

}
