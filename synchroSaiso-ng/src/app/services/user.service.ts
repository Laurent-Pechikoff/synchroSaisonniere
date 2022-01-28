import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/admin';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.url);
  }

  getUser(login:any, mdp:any){
    return this.http.get(this.url+'/'+'?login='+login)
  }

  getUserById(userId: any) {
    return this.http.get(this.url + '/' + userId)
  }

  deleteUser(userId: any) {
    return this.http.delete(this.url + '/' + userId)
  }

}
