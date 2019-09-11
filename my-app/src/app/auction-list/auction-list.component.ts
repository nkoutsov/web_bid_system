import { Component, OnInit } from '@angular/core';
import { Auction } from '../models/auction';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  private auctions: Auction[];
  private username: string;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) { }

  ngOnInit() {
    this.getAuctions();
    this.username = localStorage.getItem('username');
  }

  getAuctions() {
    this.auctionService.getAuctions().subscribe(auctions => this.auctions = auctions.results);
    // this.auctionService.searchAuction("1",null,'good',null).subscribe(auctions => this.auctions = auctions.results);
  }

}
