import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataUser:any

  constructor(private us:UserService) { }


  ngOnInit(): void {
  }

  public loginUser(userForm:any){
    let login = userForm.form.value.login
    let mdp   = userForm.form.value.password
    this.us.getUser(login,mdp).subscribe(resp=>{
      this.dataUser=resp
      sessionStorage.setItem('login',JSON.stringify(this.dataUser))
      location.reload();
  
    })

  }




}
