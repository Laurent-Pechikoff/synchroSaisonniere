import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userList: any;
  userSelected:any
  user= {
    id:'',
    name:'',
    firstName: '',
    email: '',
    role: [],
    navbarVert: false
  };
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserByID(1);
  }
  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    })
  }
  getUserByID(userId: any) {
    this.userService.getUserById(userId).subscribe(resp => {
      this.userSelected = resp;
      console.log(this.userSelected);
    })
  }
  suprimUser(userId: any) {
    this.userService.deleteUser(userId).subscribe(resp => {
      this.getAllUsers();
    })
  }
}
