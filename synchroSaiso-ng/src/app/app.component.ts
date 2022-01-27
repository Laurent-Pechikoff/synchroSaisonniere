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

  public checkHome(){   
      this.checkNavBarVert=false
  }

  public watchNavBar(){
    this.nbs.getItemsNavBar().subscribe(resp=>{
      this.dataNavBar=resp     
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

  // i=0
  // compteurCard=0
  // compteurLigne=0
  // couleurCardProduit(id:any){
  //   if(id==1){
  //     this.i=0
  //     this.compteurCard=1
  //     this.compteurLigne=0
  //   }
  //   let TableauCouleur=["#3ED598","#F2B200","#FF565E","#69A1BA"];// Vert,Jaune,Rouge,Bleu
  //   if(this.compteurCard%4==0 && this.compteurLigne==0)//si multiple de 4
  //     {
  //       this.compteurLigne++;
  //       this.i=this.compteurCard-1
  //     }else if(this.compteurCard%4==0  && this.compteurLigne>0)//si multiple de 4
  //     {
  //       this.compteurLigne++;
  //       if(this.i==3){this.i=0 }else{this.i=this.i+1}
  //   }else if(this.compteurCard<5)
  //   {
  //     this.i=this.compteurCard-(4*this.compteurLigne)-1
  //   }else{
  //     this.i=this.compteurCard-(4*this.compteurLigne);
  //   }
  //   console.log("voici mon i "+this.i+" pour compteur carte: "+this.compteurCard+" id = "+id);
  //   this.compteurCard++
  //   return TableauCouleur[this.i];
  // }

  public togglerAnim(css:any){
    let toggler=document.getElementById(css)
    let togglerStatut='togglerIcon no-active'
    if(toggler?.className==togglerStatut){
      toggler?.classList.toggle('open')
    }else{
      toggler?.classList.toggle('open')
    }
  }

}
