
// **************************  Module Angular  ***************************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// **************************  Component Angular  ***************************
import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './app.component';
import { ActifsComponent } from './components/actifs/actifs.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component'; 
import { CalendarComponent } from './components/calendar/calendar.component';

// **************************  Apis Externe  ***************************
import { GoogleMapsModule } from '@angular/google-maps'
import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

// **************************  Plugins  ***************************
FullCalendarModule.registerPlugins([ 
  interactionPlugin,
  dayGridPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ActifsComponent,
    AdminComponent,
    UserComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    FullCalendarModule,
  ],
  providers: [ActifsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
