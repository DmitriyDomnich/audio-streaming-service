import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchTracksComponent } from './tracks/search-tracks/search-tracks.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SearchArtistsComponent } from './search-artists/search-artists.component';
import { MatCard } from '@angular/material/card';
import { SearchAlbumsComponent } from './search-albums/search-albums/search-albums.component';
import { SearchPlaylistsComponent } from './search-playlists/search-playlists/search-playlists.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    RouterModule
  ],
  declarations: [SearchComponent, SearchTracksComponent, SearchArtistsComponent, SearchAlbumsComponent, SearchPlaylistsComponent]
})
export class SearchModule { }
