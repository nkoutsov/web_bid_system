import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuctionService } from '../../services/auction.service';
import { Auction } from '../../models/auction';

@Component({
  selector: 'app-search-auctions',
  templateUrl: './search-auctions.component.html',
  styleUrls: ['./search-auctions.component.css']
})
export class SearchAuctionsComponent implements OnInit {
  auctions : Auction[];
  myform;
  results;
  active=false;
  pageOfItems: any[];

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
     this.auctionService.searchAuction(data.category,data.max_price,data.description,data.location).subscribe(auctions => {this.auctions = auctions.results;this.results = this.auctions.length; });
     this.active = true;
     

   }

   onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
 }

  

  

  ngOnInit() {
  }

}
