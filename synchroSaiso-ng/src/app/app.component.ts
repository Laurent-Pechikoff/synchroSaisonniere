import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'synchroSaiso-ng';
  dataNavBar:any

  constructor (){}

  ngOnInit(): void {
    this.watchNavBar();
  }

  public watchNavBar(){

  }

}
