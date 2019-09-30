import { Component, OnInit } from '@angular/core';
import { Auction } from '../../models/auction';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../services/auction.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  private auctions: Auction[];
  private username: string;
  pageOfItems: any[];

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) { }

  ngOnInit() {
    this.getAuctions();
    this.username = localStorage.getItem('username');
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
 }

  getAuctions() {
    this.auctionService.getAuctions().subscribe(auctions => {
      this.auctions = auctions.results;
    });
  }

}
