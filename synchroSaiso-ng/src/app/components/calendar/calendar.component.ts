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
 dataIcal:any

  Events: any = [];
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

    this.getIcal()

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
  
  icalEvent={
    title:'',
    start:'',
    end:'',
    startHour:14,
    endHour:11,
    urlOrigin:'',
    idOrigin:'',
    actif:{}
  }

  convertFrenchDate(date:any){
    let year= date.substr(0,4)
    let month= date.substr(4,2)
    let day= date.substr(6,2)
    return year+'-'+month+'-'+day
  }

  getIcal(){
    this.cs.getIcal().subscribe(resp=>{
      this.dataIcal=resp
      this.dataIcal=this.dataIcal.vcalendar[0].vevent
      console.log(this.dataIcal.length)
      for(let i=0;i<this.dataIcal.length;i++){ 
          let desc=''
              for(let j=0;j<this.dataIcal[i].description.length;j++){
                if(this.dataIcal[i].description[j]=='\\'){break}
                if(j>16){ desc+=this.dataIcal[i].description[j]}
              }
              this.icalEvent.title=desc
          this.icalEvent.start=this.convertFrenchDate(this.dataIcal[i].dtstart[0]);
          this.icalEvent.end=this.convertFrenchDate(this.dataIcal[i].dtend[0]);
          this.icalEvent.idOrigin=this.dataIcal[i].uid;
              this.Events[i]= this.icalEvent
              console.log(this.Events)

              
      }
    })
  }


}
