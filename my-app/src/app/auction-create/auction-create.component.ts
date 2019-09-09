import { Component, OnInit } from '@angular/core';
import { Auction } from '../models/auction';
import { AuctionService } from '../auction.service';

declare var ol: any;

@Component({
  selector: 'my-app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: ['./auction-create.component.css']
})
export class AuctionCreateComponent implements OnInit {
  model: any = {};

  map: any;
  auction : Auction;

  constructor() { console.log("Aa") }

  ngOnInit() {
  }

  submitAuction() {
    //alert("oti na nai " + this.model)
    let auctionService : AuctionService;
    alert("oti na nai ")
    let auction : Auction = {
      id: null,
      name: "john",//this.model.name,
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
    alert("oti na nai " + auction.category)

    this.model.description = this.model.ends;

    alert(auctionService.postAuction(auction));
  }

}
