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
    statutUsers: '',
    email: '',
    login: '',
    phone: '',
    role: ''
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
    console.log("je suis la")
    this.userService.deleteUser(userId.id).subscribe(resp => {
      this.getAllUsers();
      this.affichSelected = false
    })
  }

  modifierUser() {
    this.userService.putUser(this.user).subscribe(resp => {
      this.getAllUsers();
    })
  }
  modifRecup(user: any) {
    this.user = user;
    // if (this.afficherModif != true) {
    //   this.afficherModif = true;
    // }
  }


  public watchUser(id: any) {
    this.userService.getUserById(id).subscribe(resp => {
      this.userSelected = resp
      console.log(this.userSelected)
      //this.switchUser(this.userSelected)
      this.affichSelected = true
    })

  }

  // switchUser(data: any) {
  //   console.log("id = " + data.id)
  //   let div = document.getElementById("userDetails")
  //   let bouton = <HTMLInputElement>document.getElementById("footer")

  //   while (bouton?.firstChild) {
  //     bouton.removeChild(bouton.firstChild);
  //   }
  //   while (div?.firstChild) {
  //     div.removeChild(div.firstChild);
  //   }
  //   for (let i = 0; i < Object.keys(data).length; i++) {
  //     let item = Object.keys(data)[i]
  //     let valu = Object.values(data)[i];
  //     // if (valu == null) {
  //     //   valu = "";
  //     // }
  //     let liste = document.createElement('li');
  //     liste.textContent = item + " : " + valu;
  //     //  console.log(liste.textContent)
  //     // let textList = document.createTextNode(item + " : " + valu);
  //     // liste.appendChild(textList);
  //     div?.appendChild(liste)
  //     // form.innerHTML+="<div class='form-group d-inline'><label class='form-label mt-4 col-4' for='"+item+"'       >"+item+":</label><input name='"+item+"' value='"+valu+"'class='form-control col-8 text-dark' style='max-width: 400px;' ></div>"

  //   }

  //   bouton.innerHTML = "<button class='btn btn-danger' >Supprimer abonné</button>"

  //   //<button class="btn btn-danger" (click)="suprimUser(userSelected)">Supprimer abonné</button>
  // }
}
