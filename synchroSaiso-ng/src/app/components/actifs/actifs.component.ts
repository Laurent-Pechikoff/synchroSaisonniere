import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';
import { ActifService } from 'src/app/services/actif.service';

@Component({
  selector: 'app-actifs',
  templateUrl: './actifs.component.html',
  styleUrls: ['./actifs.component.css'],
})


export class ActifsComponent implements OnInit {
  // *****************************************variable crud ******************************
  datActifs: any
  datActif: any
  actifId = 1
  idUser:any

  itemActif={
    actifId:'id',
    name:'Name',
    type:'Type',
    surface:'Surface',
    capacite:'Capacite',
    numero:'numero',
    rue:'rue',
    cp:'cp',
    ville:'ville',
    departement:'departement',
    region:'region',
    pays:'pays',
    lat:0,
    lng:0,
    numeroFiscal:'Numero Fiscal',
    statutFiscal:'Statut Fiscal',
    urlAirBnb:'urlAirBnb',
    urlBooking:'urlBooking',
    urlTripAdvisor:'urlTripAdvisor',
    urlHomeAway:'urlHomeAway',
  }

  // *****************************************variable geocoding ******************************
  datActiForm={
    actifId:'',
    name:'',
    type:'',
    surface:'',
    capacité:'',
    numero:'',
    rue:'',
    cp:'',
    ville:'',
    departement:'',
    region:'',
    pays:'',
    lat:0,
    lng:0,
    numeroFiscal:'',
    statutFiscal:'',
    urlAirBnb:'',
    urlBooking:'',
    urlTripAdvisor:'',
    urlHomeAway:'',
  }

  dataAddress={
    numero:'',
    rue:'',
    ville:'',
    departement:'',
    region:'',
    pays:'',
    cp:'',
    lat:0,
    lng:0,
  }

  dataGeocoding:any
  geocoding:any
  adress=''
// ***************************************** variable googlemaps ******************************
  

  centerOrigin={
    lat: 47.139049,
    lng: 2.644761,
  }
  zoom = 5
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 0
  }


  // ***************************************** variable markers ******************************
    // actifMarker=new google.maps.Marker({
    //   position: {
    //     lat: 47.139049,
    //     lng: 2.644761
    //   },
    //   label:"test"
    // })

    marker={
      position:{lat: 47.139049,lng: 2.644761}
    }
  

  //*****************************************************************************************
  // ******************************************* les methodes **********************************
  // **********************************************************************************************



  constructor(private as: ActifService) { }

  ngOnInit(): void {
   
    this.idUser=JSON.parse(sessionStorage.getItem('login')|| '{}')[0].id
    console.log(this.idUser)

    this.watchActif(1)
    localStorage.setItem('location','actifs')
    // **************** lancement googlemaps  **********************
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

   
  }


  
   changeMarkerPosition(marker:any, lat:any, lng:any) {
      marker.position['lat']=lat;
      marker.position['lng']=lng;
    }

  geoResult=false
  // ****************************************  Requete geocoding ****************************
  findGeocoding(form: any) {
    console.log(form)
    this.adress = form.form.value.adress
    this.as.geocoding(this.adress).subscribe(resp => {
      this.dataGeocoding = resp
      //********************** alimentation de l'adresse dans l'objet ************************************/
      for (let i = 0; i < 7; i++) {
        let x = this.dataGeocoding.results[0].address_components[i].long_name
        let y: string = Object.keys(this.dataAddress)[i]
        Object.defineProperty(this.dataAddress, y, { value: x })
      }

      //********************** alimentation des coordonnées GPS  dans l'objet ************************************/
      let x = this.geocoding = this.dataGeocoding.results[0].geometry.location
      this.dataAddress['lat'] = x.lat
      this.dataAddress['lng'] = x.lng

     this.geoResult=true
    })

  }
// ****************************************  Création des Marqueurs ****************************
  // addMarker() {
  //   this.markers.push({
  //     position: {
  //       lat: 43.3049803,
  //       lng: 5.369274,
  //     },
  //     label: {
  //       color: 'red',
  //       text: 'Marker label ' + ("4 rue gourjon"),
  //     },
  //     title: 'Marker title ' + (this.markers.length + 1),
  //     options: { animation: google.maps.Animation.BOUNCE },
  //   })
  // }


// **********************************  CRUD  ******************************************

  public watchActif(id:any){

    
    this.as.getActifsById(this.idUser).subscribe(resp=>{
      this.datActifs=resp
      this.datActif=this.datActifs[id]
      this.switchActif(this.datActif)

    })
  }

  switchActif(data:any){
    let divActif=<HTMLInputElement>document.getElementById('actifDetail')
    divActif.innerHTML="";
    let divAdress=<HTMLInputElement>document.getElementById('divAdress')
    divAdress.innerHTML="";
    let title=<HTMLInputElement>document.getElementById('title')
    title.innerHTML="";
    let lat:any;
    let lng:any;


      for(let i=0;i<Object.keys(data).length;i++){
        let item=Object.keys(data)[i];
        let valu=Object.values(data)[i];
        let itemActifItemAddress=false
        switch (item){
          case 'lat': lat=valu;break
          case 'lng': lng=valu;break
        }
        // form.innerHTML+="<div class='form-group d-inline'><label class='form-label mt-4 col-4' for='"+item+"'       >"+item+":</label><input name='"+item+"' value='"+valu+"'class='form-control col-8 text-dark' style='max-width: 400px;' ></div>"
        for(let j=0;j<Object.keys(this.dataAddress).length;j++){
          if(item==Object.keys(this.dataAddress)[j]){
            itemActifItemAddress=true 
            break 
          }
        }
        if(itemActifItemAddress==true){
          divAdress.innerHTML+="<div class='row'><span class='col-4'>"+item+" : </span><span class='col-8'>"+valu+"</span></div>";
        }else{
          if(item=='name'){
            title.innerHTML+=valu
          }
          // console.log(Object.values(this.itemActif)[18])
          divActif.innerHTML+="<div class='row'><span class='col-4'>"+Object.values(this.itemActif)[i] +" : </span><span class='col-8'>"+valu+"</span></div>";
        }
      }

      this.marker.position['lat']=lat
      this.marker.position['lng']=lng
      this.changeMarkerPosition(this.marker,lat,lng)


  }

  page=1
  navFormSup(){
    this.page+=1
    this.forModalActif(this.page)
  }
  navFormMoins(){
    this.page-=1
    this.forModalActif(this.page)
  }
  forModalActif(page:any){
    switch(page){
      case 1:
        document.getElementById('addActiForm1')?.classList.replace('d-none','d-block')
        document.getElementById('addActiForm2')?.classList.replace('d-block','d-none')
        break
      case 2:
        document.getElementById('addActiForm2')?.classList.replace('d-none', 'd-block')
        document.getElementById('addActiForm1')?.classList.add('d-none')
        document.getElementById('addActiForm3')?.classList.replace('d-block','d-none')
        break
      case 3:
        document.getElementById('addActiForm3')?.classList.replace('d-none', 'd-block')
        document.getElementById('addActiForm2')?.classList.replace('d-block', 'd-none')
    }
  }

  addActif(addActiForm:any){
    let addActiForm1=addActiForm.form.value
    // let idUser=JSON.parse(sessionStorage.getItem('login')|| '{}')
    this.as.postActif(addActiForm1, this.idUser[0].id).subscribe(resp=>{
      console.log('actif add')
    })
  }
}



