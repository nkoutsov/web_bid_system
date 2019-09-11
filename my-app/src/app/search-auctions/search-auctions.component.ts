import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-search-auctions',
  templateUrl: './search-auctions.component.html',
  styleUrls: ['./search-auctions.component.css']
})
export class SearchAuctionsComponent implements OnInit {
  auctions;
  myform;
  active=false;

  constructor(
    private auctionService : AuctionService,
    private formBuilder : FormBuilder
  ) {
    this.myform = this.formBuilder.group({
      category: '',
      max_price: '',
      description: '',
      location: ''
    });
   }

   onSubmit(data) {
     this.auctionService.searchAuction(data.category,data.max_price,data.description,data.location).subscribe(auctions => this.auctions = auctions.results);
     this.active = true;
   }

  

  

  ngOnInit() {
  }

}
