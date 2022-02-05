import { Component, Injectable, OnInit} from '@angular/core';
import { ActifsComponent } from './components/actifs/actifs.component';
import { AdminComponent } from './components/admin/admin.component';
import { ActifService } from './services/actif.service';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

@Injectable({providedIn:'any'})
export class AppComponent implements OnInit {  
  title = 'synchroSaiso-ng';
  dataNavBar:any
  dataNavBarVert:any
  checkNavBarVert=false
  session=JSON.parse(sessionStorage.getItem('login')||'{}'); //pour recuperer un objet dans localsotorage ou sessionstorage il faut le parser
  sessionExist=false;

  constructor(private nbs: NavbarService, private actif:ActifsComponent, private admin:AdminComponent) {  }  
  

  ngOnInit(): void {
    // **********************  navbar  ************************
    if(Object.keys(this.session).length!=0){
      this.sessionExist=true
      this.session=this.session[0]
    }else{
      this.sessionExist=false
      this.session.role='Visiteur'
    }
    this.watchNavBar();
    // ************************ googlemaps **************************
  }

  public checkHome() {
    this.checkNavBarVert = false
  }

  public watchNavBar(){
      console.log(this.session.role)
      this.nbs.getItemsNavBar(this.session.role).subscribe(resp=>{
        this.dataNavBar=resp  
        console.log(this.dataNavBar)   
      })
    
  }

  public watchNavBarVert(table: any) {
    this.checkNavBarVert = false
    this.nbs.getItemsNavabarVert(table.routerLink).subscribe(resp => {
      this.dataNavBarVert = resp
      if (table.navbarVert == true) {
        this.checkNavBarVert = true
      }
    })
  }

  public togglerAnim(css:any){
    let toggler=document.getElementById(css)
    let togglerStatut='togglerIcon no-active'
    if(toggler?.className==togglerStatut){
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

  public deleteSession(){
    sessionStorage.removeItem('login');
    location.replace('/home')
  }


  checkOrigin(){
    localStorage.setItem('origin','connexion')
    location.replace('/user')
  }


  sendId(id:any){
    let location = window.location.href;
    console.log()
    switch (location) {
      case 'http://localhost:4200/actifs':
        this.actif.watchActif(id)
        break;
      case 'http://localhost:4200/admin':
         this.admin.getUserByID(id)   
        break;
      case 'http://localhost:4200/agenda':
        //verifier le nom du path    
        break;
      case 'http://localhost:4200/statistique':
          //verifier le nom du path    
        break;
      default:
        break;
    }
    
  }

}


