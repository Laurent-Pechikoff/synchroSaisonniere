import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, getEventClassNames } from '@fullcalendar/angular';
import { ActifService } from 'src/app/services/actif.service';
import { CalendarService } from 'src/app/services/calendar.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  dataAirbnb: any
  dataIcal: any
  dataEvents: any = []





  Events: any = [
    {title:'test', start:'2022-02-25', end:'2022-02-26'},
    {title:'test', start:'2022-02-27', end:'2022-02-28'},
  ];
  calendarOptions: CalendarOptions | undefined;

  constructor(private cs: CalendarService, private as:ActifService) { }

  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr)
  }

  ngOnInit(): void {
    localStorage.setItem('location', 'calendar')
    // setTimeout(() => {
    //   return this.httpClient.get('http://localhost:8888/event.php')
    //     .subscribe(res => {

    //         this.Events.push();
    //         console.log(this.Events);
    //     });
    // }, 2200);

// ******************************   lancement Full Calendar  ******************************
this.getIcal(2)
setTimeout(() => {
  this.calendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.onDateClick.bind(this),
    events: this.Events,
    eventClick: function (info) {
      info.jsEvent.preventDefault();//empecher le changement d'url sur le meme onglet
      if (info.event.url) {
        window.open(info.event.url);//ouverture nouvel onglet sur url
      }
    }
  };
  setTimeout(()=>{ console.log('venets '+this.Events)},5000)

}, 5000);

  }
  



  //*************************************** Affichage Events   ****************************
  getEventsBack(idactif:any) {
    let watchEvent = {
      title: '',
      start: '',
      end: '',
      url: '',
    }
     let dataBack:any
      this.cs.getEventsBack(idactif).subscribe(resp => {
        dataBack = resp;
        console.log('resp ='+dataBack)

        for(let i=0;i<dataBack.length;i++){
          // watchEvent.title=dataBack[i].title
          // watchEvent.start=dataBack[i].start
          // watchEvent.end=dataBack[i].end
          // watchEvent.url=dataBack[i].url
          // this.Events.push(watchEvent)

        }
      });
  
    }
  


// **************************  recuperation fichier Ical et formatage pour enregistrement  *********************
  getIcal(idactif:any) {
    let idUser=JSON.parse(sessionStorage.getItem('login')|| '{}')[0].login
    let datA:any
    let datB:any
    // let actif
    // this.as.getActifById(idactif).subscribe(resp=>{
    //   actif=resp     
    //   localStorage.setItem('actif',JSON.stringify(actif))
    // })
    // console.log('actif :'+actif.name)
    // let actifName=JSON.parse(localStorage.getItem('actif')|| '{}')
    this.cs.getIcalAirBnb(idUser, idactif).subscribe(resp => {
      
      let plateform = 'AirBnb'
      datA = resp
      datA = datA.vcalendar[0].vevent
      for (let i = 0; i < datA.length; i++) {
        let y=this.icalToEvent(i, plateform, idactif, datA)
        this.dataEvents.push(y)
        this.Events.push(y)
      }
    })

    this.cs.getIcalBooking(idUser, idactif).subscribe(resp => {
      let plateform = 'Booking'
      datB = resp
      datB = datB.vcalendar[0].vevent

      for (let i = 0; i <datB.length; i++) {
        let x =this.icalToEvent(i, plateform, idactif, datB)
        this.dataEvents.push(x)
        this.Events.push(x)
      }

      this.cs.postEvents(idactif, this.dataEvents).subscribe(resp=>{
      this.getEventsBack(idactif)
      })
    })
  }


  icalToEvent(i:any, plateform:any, idactif:any, data:any) {
    let icalEvent = {
      title: '',
      start: '',
      end: '',
      url: '',
      idOrigin: '',
      plateform:'',
    }
      let desc = ''
    let name = ' - '
    if ("description" in data[i]) {
      for (let j = 0; j < data[i].description.length; j++) {
        if (data[i].description[j] == '\\') { break }
        if (j > 16) { desc += data[i].description[j] }
        icalEvent.url = desc
      }
    }
    if (plateform == "Booking" && "summary" in data[i]) {
      for (let j = 0; j < data[i].summary.length; j++) {
        if (j > 8) { name += data[i].summary[j] }

      }
    }
    if (plateform == 'AirBnb') {
      if ("description" in data[i]) {
        icalEvent.title = plateform
        icalEvent.plateform = plateform
      } else {
        icalEvent.title = 'En Direct'
        icalEvent.plateform = 'Réservation Direct'
      }
    } else {
      icalEvent.title = plateform + name
      icalEvent.plateform = plateform

    }

    icalEvent.start = this.convertFullCalendarDate(data[i].dtstart[0],'start');
    icalEvent.end = this.convertFullCalendarDate(data[i].dtend[0], 'end');
    icalEvent.idOrigin = data[i].uid;
    return icalEvent

  }
//+'T'+'14:00:000'


convertFullCalendarDate(date: any,type:any) {
    
    let year = date.substr(0, 4)
    let month = date.substr(4, 2)
    let day = date.substr(6, 2)
    return year + '-' + month + '-' + day
  }
  convertFrenchDate(date: any) {
    let year = date.substr(0, 4)
    let month = date.substr(4, 2)
    let day = date.substr(6, 2)
    return day + '/' + month + '/' + year
  }



}