import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userList: any;
  userSelected:any;
  affichSelected:boolean=false;
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
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
      console.log(this.userList)
        
      
    })
  }
  getUserByID(userId: any) {
    this.userService.getUserById(userId.id).subscribe(resp => {
      this.userSelected = resp;
      this.affichSelected=true;
    })
  }
  suprimUser(userId: any) {
    this.userService.deleteUser(userId.id).subscribe(resp => {
      this.getAllUsers();
      this.affichSelected=false
    })
  }
}
