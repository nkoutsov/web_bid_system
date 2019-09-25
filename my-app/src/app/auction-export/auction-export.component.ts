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
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  constructor(private auctionService : AuctionService) { }

  ngOnInit() {
    this.auctionService.getCategories().subscribe(categories => 
      {
        this.auctionService.getExportFile().subscribe(auctions =>
          {
            
              return this.dynamicDownloadByHtmlTag({
                fileName: 'auctions_export.xml',
                text: auctions
              })
          });
      });
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
