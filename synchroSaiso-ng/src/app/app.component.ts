import { Component, Injectable, OnInit } from '@angular/core';
import { ActifsComponent } from './components/actifs/actifs.component';
import { AdminComponent } from './components/admin/admin.component';
import { ActifService } from './services/actif.service';
import { NavbarService } from './services/navbar.service';
import { CalendarComponent } from './components/calendar/calendar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

@Injectable({ providedIn: 'any' })
export class AppComponent implements OnInit {
  title = 'synchroSaiso-ng';
  dataNavBar: any
  dataNavBarVert: any
  checkNavBarVert = false
  session = JSON.parse(sessionStorage.getItem('login') || '{}'); //pour recuperer un objet dans localsotorage ou sessionstorage il faut le parser
  sessionExist = false;

  constructor(private nbs: NavbarService, private cc:CalendarComponent,  private actif: ActifsComponent, private admin: AdminComponent) { }


  ngOnInit(): void {
    // **********************  navbar  ************************
    if (Object.keys(this.session).length != 0) {
      this.sessionExist = true
      this.session = this.session[0]
    } else {
      this.sessionExist = false
      this.session.role = 'Visiteur'
    }
    this.watchNavBar();
    // ************************ googlemaps **************************
  }

  public checkHome() {
    this.checkNavBarVert = false
  }

  public watchNavBar() {
    console.log(this.session.role)
    this.nbs.getItemsNavBar(this.session.role).subscribe(resp => {
      this.dataNavBar = resp
      console.log(this.dataNavBar)
    })

  }

  public watchNavBarVert(table: any) {
    this.checkNavBarVert = false
    this.nbs.getItemsNavabarVert(table.routerLink).subscribe((resp: any) => {
      this.dataNavBarVert = resp
      this.dataNavBarVert=this.dataNavBarVert._embedded.actifs
      console.log(this.dataNavBarVert)
      if (table.navbarVert == true) {
        this.checkNavBarVert = true
      }
    })
  }

  public togglerAnim(css: any) {
    let toggler = document.getElementById(css)
    let togglerStatut = 'togglerIcon no-active'
    if (toggler?.className == togglerStatut) {
      toggler?.classList.toggle('open')
    } else {
      toggler?.classList.toggle('open')
    }
  }

  private checkSession() {
    if (Object.keys(this.session).length != 0) {
      this.sessionExist = true
    } else {
      this.sessionExist = false
    }
  }

  public deleteSession() {
    sessionStorage.removeItem('login');
    location.replace('/home')
  }


  checkOrigin() {
    localStorage.setItem('origin', 'connexion')
    location.replace('/user')
  }



  sendId(id: any) {
    let location = localStorage.getItem('location')
    switch (location) {
      case 'actifs':
        console.log('senID: '+id)
        this.actif.watchActif(id)
        break;
      case 'admin':
        // this.admin.watchUser(id)

        // console.log(id)
        break;
      case 'calendar':
        // let actifObjectid
        // for(let i=0;i<Object.keys(this.dataNavBarVert).length;i++){
        //   if(id==this.dataNavBarVert[i].id){
        //     actifObjectid=this.dataNavBarVert[i]
        //   }
        // }
        // console.log(actifObjectid)
        this.cc.getIcal(id)   
        break;
      case 'statistique':
        //verifier le nom du path    
        break;
      default:
        break;
    }

  }

}


