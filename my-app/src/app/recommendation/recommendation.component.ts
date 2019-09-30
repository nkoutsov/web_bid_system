import { Component, OnInit } from '@angular/core';
import { Auction } from '../models/auction';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../services/auction.service';


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
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
    this.auctionService.getRecommended().subscribe(auctions => {
      this.auctions = auctions.results;
      let now = new Date();
      let bids;
      for (var a of this.auctions) {
        a.ends = new Date(a.ends);
        if (a.ends < now && this.username) {
          a.active = false;

          // get all bids of current auction
          this.auctionService.getBids(a.id).subscribe(data => {
            bids = data.results;
            let max_bid = bids[0];
            if (max_bid){
              a.winner = max_bid.bidder;
              this.auctionService.updateAuction(a).subscribe();
            }
          });

          
        }
      }
    });
    
    // this.auctionService.searchAuction("1",null,'good',null).subscribe(auctions => this.auctions = auctions.results);
  }

}
