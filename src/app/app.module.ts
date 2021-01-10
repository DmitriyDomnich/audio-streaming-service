import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from './home.guard';
import { MainViewModule } from './mainView/mainView/mainView.module';
import { HomeModule } from './home/home/home.module';
import { HomeComponent } from './home/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    MainViewModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [HomeGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
