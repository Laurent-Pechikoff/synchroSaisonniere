import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  



  constructor(private http:HttpClient) { }

  getEvents(){
    return this.http.get( 'https://www.airbnb.fr/calendar/ical/53827178.ics?s=1bd07d6991e5cc8601762d6348e9febf')
  }

}
