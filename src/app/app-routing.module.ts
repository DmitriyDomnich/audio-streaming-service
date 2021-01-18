import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from './home.guard';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { AlbumComponent } from './mainView/mainView/album/album/album.component';
import { ArtistComponent } from './mainView/mainView/artist/artist.component';

import { CategoryListComponent } from './mainView/mainView/category/category/category-list/category-list/category-list.component';
import { CategoryPlaylistsComponent } from './mainView/mainView/category/category/category-playlists/category-playlists/category-playlists.component';
import { CollectionComponent } from './mainView/mainView/collection/collection/collection.component';
import { UserAlbumsComponent } from './mainView/mainView/collection/collection/user-albums/user-albums/user-albums.component';
import { UserArtistsComponent } from './mainView/mainView/collection/collection/user-artists/user-artists/user-artists.component';
import { UserLikedTracksComponent } from './mainView/mainView/collection/collection/user-liked-tracks/user-liked-tracks/user-liked-tracks.component';
import { PlaylistInfoComponent } from './mainView/mainView/playlist-info/playlist-info/playlist-info.component';

const mainViewRoutes: Routes = [
  { path: 'playlist/:id', component: PlaylistInfoComponent },
  { path: 'album/:id', component: AlbumComponent},
  { path: 'artist/:id', component: ArtistComponent},
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/:id', component: CategoryPlaylistsComponent },
  {
    path: 'collection',
    component: CollectionComponent,
    children: [
      { path: '', redirectTo: 'likedtracks', pathMatch: 'full' },
      { path: 'likedtracks', component: UserLikedTracksComponent},
      { path: 'albums', component: UserAlbumsComponent },
      { path: 'artists', component: UserArtistsComponent }
    ]
 },
];

const routes: Routes = [
  { path: '', component: HomeComponent, children: mainViewRoutes, canActivate: [HomeGuard]},
  { path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
