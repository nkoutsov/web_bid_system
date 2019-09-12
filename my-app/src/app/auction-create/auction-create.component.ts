import { Component, OnInit } from '@angular/core';
import { Auction } from '../models/auction';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'my-app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: ['./auction-create.component.css']
})
export class AuctionCreateComponent implements OnInit {
<<<<<<< HEAD
  model: any = {};

  map: any;
  auction : Auction;
  returnUrl: string;

  constructor(private auctionService : AuctionService) { }

  ngOnInit() {
  }
=======
    model: any = {};
  
    map: any;
    auction : Auction;
  
    constructor(
      private auctionService : AuctionService
    ) { console.log("Aa"); }
  
    ngOnInit() {
      this.auction = {
        id: null,
        active:false,
        name: "john2",//this.model.name,
        category: ["1","2"],//this.model.category,
        currently: 1,//this.model.currently,
        buy_price: 1,//this.model.buy_price,
        first_bid: 1,//this.model.first_bid,
        number_of_bids: 1,//this.model.number_of_bids,
        location: "Greece",
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
>>>>>>> origin/authentication

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
