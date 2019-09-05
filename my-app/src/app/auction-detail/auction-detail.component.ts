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
  @Input() auction: Auction;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAuction();
  }

  getAuction() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.auctionService.getAuction(id).subscribe(auction => this.auction = auction);
  }

  goBack(): void {
    this.location.back();
  }
}
