import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-auction-export',
  templateUrl: './auction-export.component.html',
  styleUrls: ['./auction-export.component.css']
})
export class AuctionExportComponent implements OnInit {
  model: any = {};

  map: any;
  auction: any;
  bids: any;
  returnUrl: string;

  xml: string;
  json: string;

  constructor(private auctionService : AuctionService,
              private userDataService : UserDataService,
              private route: ActivatedRoute,
              private ngxXml2jsonService: NgxXml2jsonService) { }

  ngOnInit() {
    this.getAuction();

    // assign model
    /*this.model.id = id
    this.model.active = this.auction.active
    this.model.name = this.auction.name
    this.model.category = this.auction.category
    this.model.currently = this.auction.currently
    this.model.buy_price = this.auction.buy_price
    this.model.first_bid = this.auction.first_bid
    this.model.number_of_bids = this.auction.number_of_bids
    this.model.location = this.auction.location
    this.model.country = this.auction.country
    this.model.started = this.auction.started
    this.model.ends = this.auction.ends
    this.model.description = this.auction.description*/
  }

  convertAuctionToXML(){
    this.xml = "<Item ItemID=\"" + this.auction.id + "\">" + "\n"   
      this.xml += "\t" + "<Name>" + this.auction.name + "</Name>" + "\n"
      for (var category in this.auction.category) { 
        this.xml += "\t" + "<Category>" + category + "</Category>" + "\n"
      }
      this.xml += "\t" + "<Currently>" + this.auction.currently + "</Currently>" + "\n"
      this.xml += "\t" + "<First_Bid>" + this.auction.first_bid + "</First_Bid>" + "\n"
      this.xml += "\t" + "<Number_of_Bids>" + this.bids.length + "</Number_of_Bids>" + "\n"
      this.xml += "\t" + "<Bids>" + "\n"
        for (let i = 0; i < this.bids.length; i++) {
          this.xml += "\t\t" + "<Bid>" + "\n"
            this.xml += "\t\t\t" + "<Bidder UserID=\"" + this.bids[i].bidderId + "\">\n"
              this.xml += "\t\t\t\t" + "<Location>" + this.bids[i].bidderLocation + "</Location>" + "\n"
              this.xml += "\t\t\t\t" + "<Country>" + this.bids[i].bidderCountry + "</Country>" + "\n"
            this.xml += "\t\t\t" + "</Bidder>" + "\n"
            this.xml += "\t\t\t" + "<Time>" + this.bids[i].time + "</Time>" + "\n"
            this.xml += "\t\t\t" + "<Amount>" + this.bids[i].amount + "</Amount>" + "\n"
          this.xml += "\t\t" + "<Bid>" + "\n"
        }
      this.xml += "\t" + "</Bids>" + "\n"
      this.xml += "\t" + "<Location>" + this.auction.location + "</Location>" + "\n"
      this.xml += "\t" + "<Country>" + this.auction.country + "</Country>" + "\n"
      this.xml += "\t" + "<Started>" + this.auction.started + "</Started>" + "\n"
      this.xml += "\t" + "<Ends>" + this.auction.ends + "</Ends>" + "\n"
      this.xml += "\t" + "<Seller>" + this.auction.seller + "</Seller>" + "\n"
      this.xml += "\t" + "<Description>" + this.auction.description + "</Description>" + "\n"  
    this.xml += "</Item>"
  }

  convertAuctionToJSON(){
    this.json = this.ngxXml2jsonService.xmlToJson(this.xml).toString();
  }

  export(){
    this.convertAuctionToXML();
    //this.convertAuctionToJSON();
    console.log(this.xml);
    //console.log(this.json);
  }

  getAuction(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.auctionService.getAuction(id).subscribe(auction =>
      {
        this.auction = auction;
        
        this.getBids();
        
        console.log(this.auction);
        
      });
  }

  getBids(){
    this.auctionService.getBids(this.auction.id).subscribe(data => 
      {
        this.bids = data.results; 
        this.export();
      });
  }

}
