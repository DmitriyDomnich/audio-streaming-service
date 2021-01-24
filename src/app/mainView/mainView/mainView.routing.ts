import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './album/album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { CategoryListComponent } from './category/category/category-list/category-list/category-list.component';
import { CategoryPlaylistsComponent } from './category/category/category-playlists/category-playlists/category-playlists.component';
import { HomeViewComponent } from './home/home-view/home-view.component';
import { PlaylistInfoComponent } from './playlist-info/playlist-info/playlist-info.component';
import { SearchComponent } from './search/search/search.component';

const routes: Routes = [
  { path: 'search/:term', component: SearchComponent },
  { path: 'playlist/:id', component: PlaylistInfoComponent },
  { path: 'album/:id', component: AlbumComponent},
  { path: 'categories/:id', component: CategoryPlaylistsComponent, pathMatch: 'full'},
  { path: 'categories', component: CategoryListComponent},
  { path: 'artist/:id', component: ArtistComponent},
  { path: '', component: HomeViewComponent },
];

export const MainViewRoutes = RouterModule.forChild(routes);
