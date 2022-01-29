import { Component, OnInit } from '@angular/core';
import { ActifService } from 'src/app/services/actif.service';

@Component({
  selector: 'app-actifs',
  templateUrl: './actifs.component.html',
  styleUrls: ['./actifs.component.css']
})
export class ActifsComponent implements OnInit {
  data:any

  dataAddress={
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

  constructor(private as:ActifService) { }

  ngOnInit(): void {
  }


  findGeocoding(form:any){
    this.adress=form.form.value.adress
    this.as.geocoding(this.adress).subscribe(resp=>{
      this.dataGeocoding=resp
      // this.dataAddress=this.dataGeocoding.results[0].address_components
      
      
      for(let i=0;i<7;i++){
        let x=this.dataGeocoding.results[0].address_components[i].long_name
        let y: string =Object.keys(this.dataAddress)[i]
        console.log(y+' : '+x)
        // alert(this.dataAddress[y ])
        Object.defineProperty(this.dataAddress,y,{value:x})
      }
      let x=this.geocoding=this.dataGeocoding.results[0].geometry.location
      this.dataAddress['lat']=x.lat
      this.dataAddress['lng']=x.lng

    })
  }

}
