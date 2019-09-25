import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { all } from 'q';

@Component({
  selector: 'app-auction-export',
  templateUrl: './auction-export.component.html',
  styleUrls: ['./auction-export.component.css']
})
export class AuctionExportComponent implements OnInit {
  model: any = {};

  map: any;
  auction: Array<any> = [];
  bids: Array<any> = [];
  returnUrl: string;
  categories: any;

  xml: string[] = [];

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  constructor(private auctionService : AuctionService,
              private userDataService : UserDataService,
              private route: ActivatedRoute,
              private ngxXml2jsonService: NgxXml2jsonService) { }

  ngOnInit() {
    this.auctionService.getCategories().subscribe(categories => 
      {
        var promises = []
        this.categories = categories.results;
        this.auctionService.getAuctionsForExport().subscribe(async auctions =>
          {
            for(let i = 0; i < auctions.results.length; i++){
              this.auction[i] = await auctions.results[i]
              //console.log(this.auction[i].id);
              var promise = await this.auctionService.getBids(this.auction[i].id).subscribe(data => 
                {
                  this.bids[i] = data.results[i];
                  //console.log(this.xml)
                });
              promises.push(promise)
            }
              // return this.dynamicDownloadByHtmlTag({
              //   fileName: 'auctions_export.xml',
              //   text: this.xml
              // });
            all(promises).then(() => console.log("aa"));
            promises = []
            for(let i = 0; i < auctions.results.length; i++){
              promises.push(this.convertAuctionToXML(i));
            }
            all(promises).then(() => console.log(this.xml));
          });
      });
  }

  convertAuctionToXML(index){
    //console.log(this.bids)
    this.xml[index] += "<Item ItemID=\"" + this.auction[index].id + "\">" + "\n"   
      this.xml[index] += "\t" + "<Name>" + this.auction[index].name + "</Name>" + "\n"
      for (let i = 0; i < this.auction[index].category.length; i++) { 
        this.xml[index] += "\t" + "<Category>" + this.categories.find(item => item.id === this.auction[index].category[i]).name + "</Category>" + "\n"
      }
      this.xml[index] += "\t" + "<Currently>" + this.auction[index].currently + "</Currently>" + "\n"
      this.xml[index] += "\t" + "<First_Bid>" + this.auction[index].first_bid + "</First_Bid>" + "\n"
      this.xml[index] += "\t" + "<Number_of_Bids>" + this.bids[index].length + "</Number_of_Bids>" + "\n"
      this.xml[index] += "\t" + "<Bids>" + "\n"
      //console.log(this.bids[index].length)
        for (let i = 0; i < this.bids[index].length; i++) {
          this.xml[index] += "\t\t" + "<Bid>" + "\n"
            this.xml[index] += "\t\t\t" + "<Bidder UserID=\"" + this.bids[index][i].bidderId + "\">\n"
              this.xml[index] += "\t\t\t\t" + "<Location>" + this.bids[index][i].bidderLocation + "</Location>" + "\n"
              this.xml[index] += "\t\t\t\t" + "<Country>" + this.bids[index][i].bidderCountry + "</Country>" + "\n"
            this.xml[index] += "\t\t\t" + "</Bidder>" + "\n"
            this.xml[index] += "\t\t\t" + "<Time>" + this.bids[index][i].time + "</Time>" + "\n"
            this.xml[index] += "\t\t\t" + "<Amount>" + this.bids[index][i].amount + "</Amount>" + "\n"
          this.xml[index] += "\t\t" + "<Bid>" + "\n"
        }
      this.xml[index] += "\t" + "</Bids>" + "\n"
      this.xml[index] += "\t" + "<Location>" + this.auction[index].location + "</Location>" + "\n"
      this.xml[index] += "\t" + "<Country>" + this.auction[index].country + "</Country>" + "\n"
      this.xml[index] += "\t" + "<Started>" + this.auction[index].started + "</Started>" + "\n"
      this.xml[index] += "\t" + "<Ends>" + this.auction[index].ends + "</Ends>" + "\n"
      this.xml[index] += "\t" + "<Seller>" + this.auction[index].seller + "</Seller>" + "\n"
      this.xml[index] += "\t" + "<Description>" + this.auction[index].description + "</Description>" + "\n"  
    this.xml[index] += "</Item>" + "\n"
    //console.log(this.xml)
  }

  private dynamicDownloadByHtmlTag(arg: {
                                          fileName: string,
                                          text: string
                                        }) 
  {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }
}
