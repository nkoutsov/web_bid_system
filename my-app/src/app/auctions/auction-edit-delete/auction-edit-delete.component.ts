import { Component, OnInit } from '@angular/core';
import { Auction } from '../../models/auction';
import { AuctionService } from '../../services/auction.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auction-edit-delete',
  templateUrl: './auction-edit-delete.component.html',
  styleUrls: ['./auction-edit-delete.component.css']
})
export class AuctionEditDeleteComponent implements OnInit {
  model: any = {};

  map: any;
  auction : any;
  returnUrl: string;

  constructor(private auctionService : AuctionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // first get auction and its bids
    const id = +this.route.snapshot.paramMap.get('id');
    this.auctionService.getAuction(id).subscribe(auction => {
      this.model = auction;
      this.auctionService.getCategories().subscribe(data => {
          this.model.category = data.results; console.log(this.model);
        });
    });

  }

  updateAuction() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    let auction : any = {
      id: this.model.id,
      active: this.model.active,
      name: this.model.name,
      category: this.model.category.map(c => c.name),
      //currently: this.model.currently,
      buy_price: this.model.buy_price,
      first_bid: this.model.first_bid,
      //number_of_bids: this.model.number_of_bids,
      location: this.model.location,
      country: this.model.country,
      // started: this.model.started,
      ends: this.model.ends,
      description: this.model.description,
      winner: this.model.winner
    };
    
    this.auctionService.putAuction(auction).subscribe(data => console.log(data));
  }

  deleteAuction(){
    if (confirm('Are you sure you want to delete auction with id ' + +this.route.snapshot.paramMap.get('id') + '?')) {
      this.auctionService.deleteAuction(+this.route.snapshot.paramMap.get('id')).subscribe(data => console.log(data));
    } 
  }
}
