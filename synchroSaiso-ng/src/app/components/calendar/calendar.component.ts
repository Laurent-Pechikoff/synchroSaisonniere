import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, getEventClassNames } from '@fullcalendar/angular';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
 dataAirbnb:any
 
  Events = [
    {title: 'event 1', date: '2022-02-01'},
    {title: 'event 2', date: '2022-02-05'}

  ];
  calendarOptions: CalendarOptions | undefined;
   
  constructor(private cs:CalendarService) { }

  onDateClick(res:any) {
    alert('Clicked on date : ' + res.dateStr)
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   return this.httpClient.get('http://localhost:8888/event.php')
    //     .subscribe(res => {
       
    //         this.Events.push();
    //         console.log(this.Events);
    //     });
    // }, 2200);

    this.getEvents()

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events
      };
    }, 2500);
         
  }  

  getEvents(){
    {
      this.cs.getEvents().subscribe(resp=>{
        this.dataAirbnb=resp;
        console.log(this.dataAirbnb)
      });
    }
  }
  

}
