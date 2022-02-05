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




  Events: any = [  ];
  calendarOptions: CalendarOptions | undefined;
   
  constructor(private cs:CalendarService) { }

  onDateClick(res:any) {
    alert('Clicked on date : ' + res.dateStr)
  }

  ngOnInit(): void {
    localStorage.setItem('location','calendar')
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
        events: this.Events,
        eventClick: function(info){
          info.jsEvent.preventDefault();//empecher le changement d'url sur le meme onglet
          if (info.event.url) {
            window.open(info.event.url);//ouverture nouvel onglet sur url
          }
        }
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
  


  getIcal(){
    this.cs.getIcalAirBnb().subscribe(resp=>{
      let plateform='AirBnb'
      this.dataIcal=resp
      this.dataIcal=this.dataIcal.vcalendar[0].vevent
      for(let i=0;i<this.dataIcal.length;i++){ 
          this.Events.push( this.icalToEvent(i,plateform))
        }
    })
    this.cs.getIcalBooking().subscribe(resp=>{
      let plateform='Booking'
      this.dataIcal=resp
      this.dataIcal=this.dataIcal.vcalendar[0].vevent
      for(let i=0;i<this.dataIcal.length;i++){ 
          this.Events.push( this.icalToEvent(i,plateform))
      }
      console.log(this.Events)
    })
  }


icalToEvent( i:any, plateform:any){
  let icalEvent2={
    title:'',
    start:'',
    end:'',
    plateform:'',
    startHour:'14:00',
    endHour:'11:00',
    url:'',
    idOrigin:'',
  } 
  let desc=''
  let name=' - '
  if("description" in this.dataIcal[i]){ 
      for(let j=0;j<this.dataIcal[i].description.length;j++){
        if(this.dataIcal[i].description[j]=='\\'){break}
        if(j>16){ desc+=this.dataIcal[i].description[j]}
        icalEvent2.url=desc
      }
  }
  if(plateform=="Booking" && "summary" in this.dataIcal[i]){ 
    for(let j=0;j<this.dataIcal[i].summary.length;j++){
      if(j>8){ name+=this.dataIcal[i].summary[j]}
      
    }
  }
  if(plateform=='AirBnb'){
    if("description" in this.dataIcal[i]){
      icalEvent2.title=plateform
      icalEvent2.plateform=plateform
    }else{
      icalEvent2.title='En Direct'
      icalEvent2.plateform='Réservation Direct'
    }
  }else{
    icalEvent2.title=plateform+name
    icalEvent2.plateform=plateform

  }
  
  icalEvent2.start=this.convertFullCalendarDate(this.dataIcal[i].dtstart[0]);
  icalEvent2.end=this.convertFullCalendarDate(this.dataIcal[i].dtend[0]);
  icalEvent2.idOrigin=this.dataIcal[i].uid;
  return icalEvent2
    
  }



convertFullCalendarDate(date:any){
  let year= date.substr(0,4)
  let month= date.substr(4,2)
  let day= date.substr(6,2)
  return year+'-'+month+'-'+day
}
convertFrenchDate(date:any){
  let year= date.substr(0,4)
  let month= date.substr(4,2)
  let day= date.substr(6,2)
  return day+'/'+month+'/'+year
}



}