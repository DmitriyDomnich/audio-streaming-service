import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album/album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { CategoryListComponent } from './category/category/category-list/category-list/category-list.component';
import { CategoryPlaylistsComponent } from './category/category/category-playlists/category-playlists/category-playlists.component';
import { PlaylistInfoComponent } from './playlist-info/playlist-info/playlist-info.component';

const routes: Routes = [
  { path: 'playlist/:id', component: PlaylistInfoComponent },
  { path: 'album/:id', component: AlbumComponent},
  { path: 'categories/:id', component: CategoryPlaylistsComponent, pathMatch: 'full'},
  { path: 'categories', component: CategoryListComponent},
  { path: 'artist/:id', component: ArtistComponent}
];

export const MainViewRoutes = RouterModule.forChild(routes);
