import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  url='http://localhost:3000/navbar'

  constructor(private http:HttpClient) { }

  public getItemsNavBar(){
    return this.http.get(this.url)
  }

}
