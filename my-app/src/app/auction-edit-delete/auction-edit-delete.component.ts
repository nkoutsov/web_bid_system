import { Component, OnInit } from '@angular/core';
import { Auction } from '../models/auction';
import { AuctionService } from '../auction.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auction-edit-delete',
  templateUrl: './auction-edit-delete.component.html',
  styleUrls: ['./auction-edit-delete.component.css']
})
export class AuctionEditDeleteComponent implements OnInit {
  model: any = {};

  map: any;
  auction : Auction;
  returnUrl: string;

  constructor(private auctionService : AuctionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // first get auction and its bids
    const id = +this.route.snapshot.paramMap.get('id');
    this.auctionService.getAuction(id).subscribe(auction => this.auction = auction);
    this.auctionService.getAuction(id).subscribe(auction => this.auction = auction);

    // assign model
    this.model.id = id
    this.model.active = this.auction.active
    this.model.name = this.auction.name
    this.model.category = this.auction.category
    this.model.currently = this.auction.currently
    this.model.buy_price = this.auction.buy_price
    this.model.first_bid = this.auction.first_bid
    this.model.number_of_bids = this.auction.number_of_bids
    this.model.location = this.auction.location
    this.model.country = this.auction.country
    this.model.started = this.auction.started
    this.model.ends = this.auction.ends
    this.model.description = this.auction.description
    this.model.seller = this.auction.seller
  }

  updateAuction() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    let auction : Auction = {
      id: this.model.id,
      active: this.model.active,
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
      description: this.model.description,
      seller: this.model.seller
    };
    
    this.auctionService.putAuction(auction).subscribe(data => console.log(data));
  }

  deleteAuction(){
    if (confirm('Are you sure you want to delete auction with id ' + +this.route.snapshot.paramMap.get('id') + '?')) {
      this.auctionService.deleteAuction(+this.route.snapshot.paramMap.get('id')).subscribe(data => console.log(data));
    } 
  }
}
