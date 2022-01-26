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

  constructor (private nbs:NavbarService){}

  ngOnInit(): void {
    this.watchNavBar();
  }

  public watchNavBar(){
    this.nbs.getItemsNavBar().subscribe(resp=>{
      this.dataNavBar=resp
      console.log(this.dataNavBar)
     
    })
  }
  
  public watchNavBarVert(table:any){
    console.log(table)
    this.checkNavBarVert=false
    this.nbs.getItemsNavabarVert(table.routerLink).subscribe(resp=>{
      this.dataNavBarVert=resp
      if(table.navbarVert==true){
        this.checkNavBarVert=true
      }
      console.log(this.checkNavBarVert)
    })
  }

}
