import { Component, OnInit } from '@angular/core';
import { Auction } from '../models/auction';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'my-app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: ['./auction-create.component.css']
})
export class AuctionCreateComponent implements OnInit {
  model: any = {};

  map: any;
  auction : Auction;
  returnUrl: string;

  constructor(private auctionService : AuctionService) { }

  ngOnInit() {
  }

  submitAuction() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    let auction : Auction = {
      id: null,
      name: this.model.name,
      category: this.model.category,
      currently: this.model.currently,
      buy_price: this.model.buy_price,
      first_bid: this.model.first_bid,
      number_of_bids: this.model.number_of_bids,
      location: this.model.location,
      country: this.model.country,
      started: this.model.started,
      ends: this.model.ends,
      description: this.model.description
    };
    
    this.auctionService.postAuction(auction).subscribe(data => console.log(data));
  }

}
