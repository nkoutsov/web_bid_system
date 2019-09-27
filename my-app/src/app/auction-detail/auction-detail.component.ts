import { Component, OnInit, Input } from '@angular/core';
import { Auction } from '../models/auction';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { Location } from '@angular/common';
import { AuctionService } from '../auction.service';
import { MessagingService } from '../messaging.service';

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
  fail:boolean;
  username;
  bids;
  won;
  messsage;
  categories;
  // auction_active : boolean;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private location: Location,
    private messageService: MessagingService
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
    this.won = this.route.snapshot.queryParamMap.get('won');
    this.auctionService.getAuction(id).subscribe(auction => {
      this.auction = auction;
      console.log(this.auction);
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
      amount : +this.amount,
      time : new Date(),
      auction : this.auction.id
    };
    let c = confirm("Are you sure you want to place the bid? This action cannot be reverted!");
    if (c && bid.amount > this.auction.currently){
      console.log(this.auction.currently);
      this.auctionService.placeBid(bid).subscribe(data => console.log(data));
      this.fail = false;
    }
    else
      this.fail = true;
  }

  start() {
    this.auction.active = true;
    this.auctionService.updateAuction(this.auction).subscribe(data => console.log(data));
  }

  getBids() {
    this.auctionService.getBids(this.auction.id).subscribe(data => this.bids = data.results);
  }

  send(messsage) {
    // alert(this.messsage);
    alert(messsage);
    let msg = {
      text:messsage,
      receiver: this.auction.seller,
      date_sent: new Date()
    };
    this.messageService.sendMessage(msg).subscribe(data => console.log(data));
    
  }
}
