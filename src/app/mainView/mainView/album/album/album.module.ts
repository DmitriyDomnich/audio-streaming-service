import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album.component';
import { InfoLayoutComponent } from './info-layout/info-layout.component';
import { PlaylistInfoModule } from '../../playlist-info/playlist-info/playlist-info.module';
import { AlbumTracksComponent } from './album-tracks/album-tracks/album-tracks.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    PlaylistInfoModule,
    MatTableModule,
    MatInputModule,
    MatInputModule,
    MatIconModule,
    RouterModule
  ],
  declarations: [AlbumComponent, InfoLayoutComponent, AlbumTracksComponent]
})
export class AlbumModule { }
