import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { LogoComponent } from './logo/logo/logo.component';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [SidebarComponent, LogoComponent, NavigationComponent, PlaylistsComponent],
  exports: [SidebarComponent]
})
export class SidebarModule { }
