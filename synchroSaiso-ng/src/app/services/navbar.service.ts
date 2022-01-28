import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  url='http://localhost:3000'

  constructor(private http:HttpClient) { }

  public getItemsNavBar(role:any){
    return this.http.get(this.url+"/navbar?role"+role+"=true")
  }

  public getItemsNavabarVert(table:any){
    return this.http.get(this.url+'/'+table)
  }

}
