import { Component, OnInit } from '@angular/core';
import { ActifService } from 'src/app/services/actif.service';

@Component({
  selector: 'app-actifs',
  templateUrl: './actifs.component.html',
  styleUrls: ['./actifs.component.css'],
})


export class ActifsComponent implements OnInit {
  // *****************************************variable crud ******************************
datActifs:any
datActif:any
actifId=1

  // *****************************************variable geocoding ******************************
  dataAddress={
    id:0,
    name:'',
    numero:'',
    rue:'',
    ville:'',
    departement:'',
    region:'',
    pays:'',
    cp:'',
    lat:0,
    lng:0
  }
  dataGeocoding:any
  geocoding:any
  adress=''
// ***************************************** variable googlemaps ******************************
  // centerOrigin={
  //   lat: 47.139049,
  //   lng: 2.644761,
  // }
  // zoom = 5
  // center!: google.maps.LatLngLiteral;
  // options: google.maps.MapOptions = {
  //   mapTypeId: 'hybrid',
  //   zoomControl: true,
  //   scrollwheel: true,
  //   disableDoubleClickZoom: true,
  //   maxZoom: 15,
  //   minZoom: 0
  // }

// ***************************************** variable markers ******************************
  markers:any

//*****************************************************************************************
// ******************************************* les methodes **********************************
// **********************************************************************************************

  constructor(private as:ActifService) { }

  ngOnInit(): void {
    this.watchActif(1)
    let loader 
  }

// ****************************************  Requete geocoding ****************************
  findGeocoding(form:any){
    this.adress=form.form.value.adress
    this.as.geocoding(this.adress).subscribe(resp=>{
      this.dataGeocoding=resp
      //********************** alimentation de l'adresse dans l'objet ************************************/
      for(let i=0;i<7;i++){ 
        let x=this.dataGeocoding.results[0].address_components[i].long_name
        let y: string =Object.keys(this.dataAddress)[i]
        Object.defineProperty(this.dataAddress,y,{value:x})
      }
           
      //********************** alimentation des coordonnées GPS  dans l'objet ************************************/
      let x=this.geocoding=this.dataGeocoding.results[0].geometry.location
      this.dataAddress['lat']=x.lat
      this.dataAddress['lng']=x.lng

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
    this.as.getActifById(id).subscribe(resp=>{
      this.datActif=resp
      console.log(this.datActif)  
      this.switchActif(this.datActif)
    })
    this.as.getActifs().subscribe(resp=>{
      this.datActifs=resp
    })
  }

  switchActif(data:any){
    let div=<HTMLInputElement>document.getElementById('actifDetail')
    div.innerHTML=""
    for(let i=0;i<Object.keys(data).length;i++){
      let item=Object.keys(data)[i]
      let valu=Object.values(data)[i];
      // form.innerHTML+="<div class='form-group d-inline'><label class='form-label mt-4 col-4' for='"+item+"'       >"+item+":</label><input name='"+item+"' value='"+valu+"'class='form-control col-8 text-dark' style='max-width: 400px;' ></div>"
      div.innerHTML+="<div class='row'><span class='col-4'>"+item+" : </span><span class='col-8'>"+valu+"</span></div>"
    }

  }


}



