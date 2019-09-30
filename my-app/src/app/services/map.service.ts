import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SourceListMap } from 'source-list-map';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  getLatLon(location: any,country:any): any {
    let latlon = {
      latitude: null,
      longtitude: null
    };
    console.log(location);
    let query = "?country="+country+"&format=json&city=" + location;
    this.http.get<any>("https://nominatim.openstreetmap.org/search" + query).subscribe(data => {
      if (data.length == 0) return latlon;
      latlon.latitude = data[0].lat;
      latlon.longtitude = data[0].lon;
      console.log(latlon);
      if(localStorage.getItem('longitude')){
        localStorage.removeItem('longtitude')
        localStorage.setItem('longitude',latlon.longtitude);
      }
      if(localStorage.getItem('lattude')){
        localStorage.removeItem('lattitude')
        localStorage.setItem('latitude',latlon.latitude);
      }
      return latlon;
    })

  }

  constructor(
    private http: HttpClient
  ) { }
}
