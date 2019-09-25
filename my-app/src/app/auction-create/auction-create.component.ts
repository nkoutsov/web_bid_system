import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { Auction } from '../models/auction';

@Component({
  selector: 'app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: ['./auction-create.component.css']
})
export class AuctionCreateComponent implements OnInit {
    model: any = {};
  
    map: any;
    auction : any;
    selectedFile: File
  
  	onFileChanged(event) {
    	this.selectedFile = event.target.files[0]
    	console.log(this.selectedFile.name);
  	}
  
    constructor(
      private auctionService : AuctionService
    ) {  }
  
    ngOnInit() {
      this.auctionService.getCategories().subscribe(data => {this.model.category = data.results; console.log(this.model);});
    }
  
    onSubmit() {
      // let auctionService : AuctionService;      
		  // this.model.description = this.model.ends;
		  this.auction = {
		    active: false,
		    name: this.model.name,
		    category: this.model.category,
		    buy_price: this.model.buy_price,
		    first_bid: this.model.first_bid,
		    number_of_bids: this.model.number_of_bids,
		    location: this.model.location,
		    country: this.model.country,
		    started: new Date(),//this.model.started,
		    ends: this.model.ends,
		    description: this.model.description,
		    winner: null
		  };

		  const dat = new FormData;
		  dat.append('name', this.auction.name);
		  dat.append('winner', null);
		  dat.append('location', this.auction.location);
		  dat.append("category",this.auction.category);
		  dat.append("buy_price",this.auction.buy_price);
		  dat.append("first_bid",this.auction.first_bid);
		  dat.append("country",this.auction.country);
		  dat.append("ends",this.auction.ends);
		  dat.append("description",this.auction.description);

		  dat.append('photo', this.selectedFile);
		  console.log(this.auction);

		  this.auctionService.postAuction(dat).subscribe(data => console.log(data));
    }

  

}
