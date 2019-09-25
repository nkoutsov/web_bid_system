import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  recommended : any;

  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
    this.recommended = this.auctionService.getRecommended().subscribe(data => console.log(data))
  }

}
