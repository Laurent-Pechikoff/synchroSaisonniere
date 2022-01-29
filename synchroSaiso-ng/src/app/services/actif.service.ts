import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActifService {
  url='http://localhost:3000/actifs'
  urlGeocoding='https://maps.googleapis.com/maps/api/geocode/json?address='
  googleKey='AIzaSyD_BA1AREtkic6MhEopOCT6vQtStzRD7Qw'
  constructor(private http:HttpClient) { }

  geocoding(adress:any){
    return this.http.get(this.urlGeocoding+adress+"+&key="+this.googleKey)
  }

  getActifs(){
    return this.http.get(this.url)
  }

}
