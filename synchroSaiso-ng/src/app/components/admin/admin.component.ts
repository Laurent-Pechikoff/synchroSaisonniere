import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dataNavBarVert: any;
  userList: any;
  userSelected: any;
  affichSelected: boolean = false;
  user = {
    id: '',
    name: '',
    firstName: '',
    email: '',
    role: [],
    navbarVert: false
  };
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
    localStorage.setItem('location', 'admin')
  }
  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
      console.log(this.userList)


    })
  }
  getUser(userId: any) {
    console.log("userId ts : " + userId)
    this.userService.getUserById(userId).subscribe(resp => {
      this.userSelected = resp;
      this.affichSelected = true;
    })
  }
  suprimUser(userId: any) {
    this.userService.deleteUser(userId.id).subscribe(resp => {
      this.getAllUsers();
      this.affichSelected = false
    })
  }
  public watchUser(id: any) {
    this.userService.getUserById(id).subscribe(resp => {
      this.userSelected = resp
      console.log(this.userSelected)
      this.switchUser(this.userSelected)
    })

  }

  switchUser(data: any) {
    let div = <HTMLInputElement>document.getElementById('userDetails')
    div.innerHTML = ""
    for (let i = 0; i < Object.keys(data).length; i++) {
      let item = Object.keys(data)[i]

      let valu = Object.values(data)[i];
      // if (valu == null) {
      //   valu = "";
      // }
      // form.innerHTML+="<div class='form-group d-inline'><label class='form-label mt-4 col-4' for='"+item+"'       >"+item+":</label><input name='"+item+"' value='"+valu+"'class='form-control col-8 text-dark' style='max-width: 400px;' ></div>"
      div.innerHTML += "<div class='row'><span class='col-4'>" + item + " : </span><span class='col-8'>" + valu + "</span></div>"
    }
  }
}
