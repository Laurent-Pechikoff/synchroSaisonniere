import { Component, OnInit } from '@angular/core';
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
    cp:'',
    ville:'',
    departement:'',
    region:'',
    pays:'',
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

  //*****************************************************************************************
  // ******************************************* les methodes **********************************
  // **********************************************************************************************

  marker={
    position:{lat: 47.139049,lng: 2.644761}
  }


  constructor(private as: ActifService) { }

  ngOnInit(): void {
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
    this.as.getActifById(id).subscribe(resp=>{
      this.datActif=resp
      this.switchActif(this.datActif)
    })
    this.as.getActifs().subscribe(resp=>{
      this.datActifs=resp
    })
  }

  switchActif(data:any){
    let divActif=<HTMLInputElement>document.getElementById('actifDetail')
    divActif.innerHTML="";
    let divAdress=<HTMLInputElement>document.getElementById('divAdress')
    divAdress.innerHTML="";
    let title=<HTMLInputElement>document.getElementById('title')
    title.innerHTML="";

      for(let i=0;i<Object.keys(data).length;i++){
        let item=Object.keys(data)[i];
        let valu=Object.values(data)[i];
        let itemActifItemAddress=false
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
          divActif.innerHTML+="<div class='row'><span class='col-4'>"+item+" : </span><span class='col-8'>"+valu+"</span></div>";
        }
    }
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
    let idUser=JSON.parse(sessionStorage.getItem('login')|| '{}')
    console.log(idUser)
    this.as.postActif(addActiForm1, idUser).subscribe(resp=>{
      console.log('actif add')
    })
  }
}



