import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistInfoComponent } from './playlist-info.component';
import { PlaylistInfoLayoutComponent } from './playlist-info-layout/playlist-info-layout/playlist-info-layout.component';
import { PlaylistTracksComponent } from './playlist-tracks/playlist-tracks/playlist-tracks.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    RouterModule
  ],
  declarations: [PlaylistInfoComponent, PlaylistInfoLayoutComponent, PlaylistTracksComponent],
  exports: [PlaylistInfoComponent, PlaylistTracksComponent]
})
export class PlaylistInfoModule { }
