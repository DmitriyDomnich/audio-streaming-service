import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MainViewModule } from 'src/app/mainView/mainView/mainView.module';
import { TopbarModule } from 'src/app/topbar/topbar/topbar.module';
import { SidebarModule } from 'src/app/sidebar/sidebar/sidebar.module';
import { PlayerModule } from 'src/app/player/player/player.module';

@NgModule({
  imports: [
    CommonModule,
    MainViewModule,
    TopbarModule,
    SidebarModule,
    PlayerModule
  ],
  declarations: [ HomeComponent ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
