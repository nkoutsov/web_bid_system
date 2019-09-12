import { Component, OnInit, Input } from '@angular/core';
import { Auction } from '../models/auction';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { Location } from '@angular/common';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  @Input() auction;//: Auction;
  amount : number;
  active : boolean;
  ended : boolean;
  username;
  bids;
  // auction_active : boolean;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAuction();
    if (localStorage.getItem("is_active") == "true") 
      this.active = true;
    else this.active = false;
    this.username = localStorage.getItem("username");
  }

  getAuction() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.auctionService.getAuction(id).subscribe(auction => {
      this.auction = auction;
      this.getBids();
      let now = new Date();
      this.auction.ends = new Date(this.auction.ends) ;
      if (this.auction.ends < now)
        this.ended = true;
    });
  }

  goBack(): void {
    this.location.back();
  }

  place() {
    let bid : any = {
      amount : this.amount,
      time : new Date(),
      auction : this.auction.id
    };
    let c = confirm("Are you sure you want to place the bid? This action cannot be reverted!");
    if (c)
      this.auctionService.placeBid(bid).subscribe(data => console.log(data));
  }

  start() {
    this.auction.active = true;
    this.auctionService.updateAuction(this.auction).subscribe(data => console.log(data));
  }

  getBids() {
    this.auctionService.getBids(this.auction.id).subscribe(data => this.bids = data.results);
  }
}
