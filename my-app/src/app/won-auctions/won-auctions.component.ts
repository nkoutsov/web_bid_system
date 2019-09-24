import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../auction.service';
import { Auction } from '../models/auction';

@Component({
  selector: 'app-won-auctions',
  templateUrl: './won-auctions.component.html',
  styleUrls: ['./won-auctions.component.css']
})
export class WonAuctionsComponent implements OnInit {
  private auctions: Auction[];
  pageOfItems: any[];

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) { }

  ngOnInit() {
    this.getWonAuctions();
  }

  getWonAuctions() {
    this.auctionService.getWonAuctions().subscribe(data => this.auctions = data.results)
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
 }

}
