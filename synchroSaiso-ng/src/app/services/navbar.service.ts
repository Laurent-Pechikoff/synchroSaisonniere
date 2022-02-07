import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  urlJson='http://localhost:3000'
  urlSB='http://localhost:8088'

  constructor(private http:HttpClient) { }

  public getItemsNavBar(role:any){
   // return this.http.get(this.urlJson+"/navbar?role"+role+"=true")
   console.log("le role session est : "+role)
    return this.http.get(this.urlSB+"/getNavbar/"+role)
  }

  public getItemsNavabarVert(table:any){
    let response:any
    switch (table) {
      case 'admin':
        response = this.http.get(this.urlSB+'/getUsers')
        break;
        case 'actifs':
          response = this.http.get(this.urlSB+'/actifs')
          break;
        case 'calendar':
          response = this.http.get(this.urlSB+'/actifs')
          break;
    
      default:
        break;
    }
    return response;
  }

}
