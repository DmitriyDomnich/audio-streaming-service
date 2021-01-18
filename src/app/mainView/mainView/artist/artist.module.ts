import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist.component';
import { ArtistInfoComponent } from './artist-info/artist-info.component';
import { ArtistAlbumsComponent } from './artist-albums/artist-albums.component';
import { ArtistRelatedArtistsComponent } from './artist-related-artists/artist-related-artists/artist-related-artists.component';
import { ArtistTopTracksComponent } from './artist-top-tracks/artist-top-tracks/artist-top-tracks.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    RouterModule
  ],
  declarations: [ArtistComponent, ArtistInfoComponent, ArtistAlbumsComponent, ArtistRelatedArtistsComponent, ArtistTopTracksComponent,
  ]
})
export class ArtistModule { }
