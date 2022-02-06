import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/users';
  urlBack = "http://localhost:8088";




  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.urlBack + '/getUsers');
  }

  getUser(login: any, mdp: any) {
    return this.http.get(this.url + '/' + '?login=' + login)
  }

  getUserById(userId: any) {
    console.log("userId service : "+userId)
    return this.http.get(this.urlBack + '/getUser/' + userId)
  }

  deleteUser(userId: any) {
    return this.http.delete(this.urlBack + '/deleteUser/' + userId)
  }

  postUser(user: any) {
    return this.http.post(this.urlBack + '/addUser', user)
  }
}
