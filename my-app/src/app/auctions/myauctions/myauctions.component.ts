import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../services/auction.service';

@Component({
  selector: 'app-myauctions',
  templateUrl: './myauctions.component.html',
  styleUrls: ['./myauctions.component.css']
})
export class MyauctionsComponent implements OnInit {
  private auctions;
  private notStarted;
  pageOfItems: any[];

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) { }

  ngOnInit() {
    this.getNotStarted();
    this.getAuctions();
  }

  getNotStarted() {
    this.auctionService.getNotStarted().subscribe(data => {console.log(data.results);this.notStarted=data.results;});
  }

  getAuctions() {
    this.auctionService.getMyAuctions().subscribe(auctions => this.auctions = auctions.results);
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
 }

 activate(a) {
   a.is_started = true;
   this.auctionService.putAuction({is_started:true,id:a.id,category:a.category,location:a.location,name:a.name,active:true}).subscribe(()=>this.getNotStarted());
 }

 editable(a) : boolean {
   if (a.is_started==false)
    return true;

 }

}
