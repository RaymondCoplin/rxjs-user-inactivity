import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { OtherComponent } from './other/other.component';

const routes = [
  { path: '', component: HelloComponent },
  { path: 'other', component: OtherComponent }
]

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, HelloComponent, OtherComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
