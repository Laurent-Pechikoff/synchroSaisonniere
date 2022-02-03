import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ActifsComponent } from './components/actifs/actifs.component';
import { AdminComponent } from './components/admin/admin.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'actifs', component:ActifsComponent},
  {path:'admin',component:AdminComponent},
  {path:'user',component:UserComponent},
  {path:'calendar',component:CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
