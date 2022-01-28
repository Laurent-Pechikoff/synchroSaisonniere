import { Component } from '@angular/core';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'synchroSaiso-ng';
  dataNavBar:any
  dataNavBarVert:any
  checkNavBarVert=false
  session=JSON.parse(sessionStorage.getItem('login') || '{}'); //pour recuperer un objet dans localsotorage ou sessionstorage il faut le parser
  sessionExist=false;
  

  constructor (private nbs:NavbarService){}

  ngOnInit(): void {
    if(Object.keys(this.session).length!=0){
      this.sessionExist=true
      this.session=this.session[0]
    }else{
      this.sessionExist=false
      this.session.role='Visiteur'
    }
    this.watchNavBar();
  }

  public checkHome(){   
      this.checkNavBarVert=false
  }

  public watchNavBar(){
      console.log(this.session.role)
      this.nbs.getItemsNavBar(this.session.role).subscribe(resp=>{
        this.dataNavBar=resp  
        console.log(this.dataNavBar)   
      })
    
  }
  
  public watchNavBarVert(table:any){
    this.checkNavBarVert=false
    this.nbs.getItemsNavabarVert(table.routerLink).subscribe(resp=>{
      this.dataNavBarVert=resp
      if(table.navbarVert==true){
        this.checkNavBarVert=true
      }
    })
  }

  public togglerAnim(css:any){
    let toggler=document.getElementById(css)
    let togglerStatut='togglerIcon no-active'
    if(toggler?.className==togglerStatut){
      toggler?.classList.toggle('open')
    }else{
      toggler?.classList.toggle('open')
    }
  }

  private checkSession(){
    if(Object.keys(this.session).length!=0){
      this.sessionExist=true
    }else{
      this.sessionExist=false
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

}
