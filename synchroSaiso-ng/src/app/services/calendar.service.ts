import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  urlBooking='https://admin.booking.com/hotel/hoteladmin/ical.html?t=d826db38-9c32-4f3e-a8bc-7c411312b20e'
  urlAirBnb= 'https://www.airbnb.fr/calendar/ical/53827178.ics?s=1bd07d6991e5cc8601762d6348e9febf'
  urlSB='http://localhost:8088'

  constructor(private http:HttpClient) { }
  
  getEvents(){
    return this.http.get('')
  }

  postEvents(idactif:any, dataEvent:any){
    console.log(dataEvent)
    return this.http.post('http://localhost:8088/addRent/'+idactif,dataEvent)
  }
  
  
  getIcalAirBnb(login:any, idActif:any){
    let data=this.http.get('../assets/ical/'+login+'/'+idActif+'/airbnb.json')
    return data
  }
  getIcalBooking(login:any, idActif:any){
    let data=this.http.get('../assets/ical/'+login+'/'+idActif+'/booking.json')
    return data
  }


}
