import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userList: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    })
  }
suprimUser(userId:any){
  this.userService.deleteUser(userId).subscribe(resp=>{
    this.getAllUsers();
  })
}
}
