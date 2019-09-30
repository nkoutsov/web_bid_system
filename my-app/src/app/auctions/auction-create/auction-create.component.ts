import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';

@Component({
  selector: 'app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: ['./auction-create.component.css']
})
export class AuctionCreateComponent implements OnInit {
	model: any = {};
	cat: any[] //number[];
  
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
		// for (var c of this.cat) {
		// 	c = Number(c);
		// }
		// this.cat = this.cat.map(Number);
      // let auctionService : AuctionService;      
		  // this.model.description = this.model.ends;
		  this.auction = {
		    active: false,
		    name: this.model.name,
		    category: this.cat, //model.category,
		    buy_price: this.model.buy_price,
		    first_bid: this.model.first_bid,
		    number_of_bids: this.model.number_of_bids,
		    location: this.model.location,
		    country: this.model.country,
		    started:null,// new Date(),//this.model.started,
		    ends: this.model.ends,
		    description: this.model.description,
		    winner: null
		  };

		  const dat = new FormData;
		  dat.append('name', this.auction.name);
		  dat.append('location', this.auction.location);
		  dat.append("category",this.auction.category[0]);
		//   dat.append("buy_price",this.auction.buy_price);
		  dat.append("first_bid",this.auction.first_bid);
		  dat.append("country",this.auction.country);
		  dat.append("ends",this.auction.ends);
		  dat.append("description",this.auction.description);
		  dat.append("ends",this.auction.ends);
		//   dat.append('started',null);

		  if(this.selectedFile)
			  dat.append('photo', this.selectedFile);
		  if(this.auction.buy_price != null)
			  dat.append("buy_price",this.auction.buy_price);
		  else
		  	this.auction.buy_price = null;
		  console.log("BUY:"+this.auction.buy_price);

		  this.auctionService.postAuction(dat).subscribe(data => {
			  let id = +data.id
			  let auction;
			  this.auctionService.getAuction(id).subscribe(data=>{
				  auction = data;
				  auction.category = this.cat;
				  auction.buy_price=null;
				  this.auctionService.putAuction(auction).subscribe(data => console.log(data));
			  })
		  });
    }

  

}
