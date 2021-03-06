import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActifService {
  url='http://localhost:3000/actifs'
  urlGeocoding='https://maps.googleapis.com/maps/api/geocode/json?address='
  googleKey='AIzaSyD_BA1AREtkic6MhEopOCT6vQtStzRD7Qw'
  urlSB='http://localhost:8088'


  constructor(private http:HttpClient) { }

  geocoding(adress:any){
    return this.http.get(this.urlGeocoding+adress+"+&key="+this.googleKey)
  }

  getActifs(){
    return this.http.get(this.urlSB)
  }

  getActifsById(){
    let idUser=JSON.parse(sessionStorage.getItem('login')|| '{}')[0].id

    
    return this.http.get(this.urlSB+'/getAllActifsByUser/'+idUser)
  }

  postActif(addForm:any, idUser:any){
     return this.http.post(this.urlSB+'/addActif/'+idUser,addForm)
  }

  getActifById(idActif:any){
    return this.http.get(this.urlSB+'/getActif/'+idActif)
  }

  updateActif(actif:any){
    let id=actif.id
    return this.http.put(this.urlSB+'/putActif/'+id,actif)
  }

}
