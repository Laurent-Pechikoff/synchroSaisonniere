import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataUser: any
  origin: any
  session = sessionStorage.getItem('login')
  constructor(private us: UserService) { }


  ngOnInit(): void {
    this.origin = localStorage.getItem('origin')

  }

  public loginUser(userForm: any) {
    let login = userForm.form.value.login
    let mdp = userForm.form.value.password
    this.us.getUser(login, mdp).subscribe(resp => {
      this.dataUser = resp
      sessionStorage.setItem('login', JSON.stringify(this.dataUser))
      location.reload();

    })

  }
  //version pour le back
  loginUserBack(userForm: any) {
    let login = userForm.form.value.login
    let mdp = userForm.form.value.mdp
    
    this.us.getUserBack(login, mdp).subscribe(resp => {
      this.dataUser = resp
      sessionStorage.setItem('login', JSON.stringify(this.dataUser))
      //location.reload();
      location.replace('http://localhost:4200/home')
    })

  }

  checkOrigin() {
    localStorage.setItem('origin', 'creation')
    this.ngOnInit();
  }

  checkConnexion() {
    localStorage.setItem('origin', 'connexion')
    this.ngOnInit();
  }

  removeOrigin() {
    this.origin = localStorage.removeItem('origin')
  }

  creatAccount(user: any) {
    let newUser = user.value
    console.log(newUser);
    this.us.postUser(newUser).subscribe(resp => {
      
      this.removeOrigin();
      this.loginUserBack(user)
    })
  }

}
