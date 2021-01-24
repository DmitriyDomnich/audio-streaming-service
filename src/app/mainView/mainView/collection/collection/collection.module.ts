import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection.component';
import { UserArtistsComponent } from './user-artists/user-artists/user-artists.component';
import { UserAlbumsComponent } from './user-albums/user-albums/user-albums.component';
import { UserLikedTracksComponent } from './user-liked-tracks/user-liked-tracks/user-liked-tracks.component';
import { CollectionRoutes } from './collection.routing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ActiveLinkDirective } from 'src/app/shared/models/directives/active-link.directive';
import { MatIconModule } from '@angular/material/icon';
import { PlaylistInfoModule } from '../../playlist-info/playlist-info/playlist-info.module';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    CollectionRoutes,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    PlaylistInfoModule
  ],
  declarations: [CollectionComponent, UserArtistsComponent, UserAlbumsComponent, UserLikedTracksComponent, ActiveLinkDirective]
})
export class CollectionModule { }
