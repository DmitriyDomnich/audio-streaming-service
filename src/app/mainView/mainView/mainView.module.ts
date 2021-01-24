import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './mainView.component';
import { PlaylistInfoModule } from './playlist-info/playlist-info/playlist-info.module';
import { MainViewRoutes } from './mainView.routing';
import { CategoryListComponent } from './category/category/category-list/category-list/category-list.component';
import { CategoryPlaylistsComponent } from './category/category/category-playlists/category-playlists/category-playlists.component';
import { BackImageDirective } from 'src/app/shared/models/directives/back-image.directive';
import { MatCardModule } from '@angular/material/card';
import { CollectionRoutes } from './collection/collection/collection.routing';
import { CollectionModule } from './collection/collection/collection.module';
import { ActiveLinkDirective } from 'src/app/shared/models/directives/active-link.directive';
import { AlbumModule } from './album/album/album.module';
import { PlaylistInfoComponent } from './playlist-info/playlist-info/playlist-info.component';
import { ArtistModule } from './artist/artist.module';
import { SearchModule } from './search/search/search.module';
import { HomeViewModule } from './home/home-view/home-view.module';



@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MainViewRoutes,
    AlbumModule,
    ArtistModule,
    HomeViewModule
  ],
  declarations: [MainViewComponent,  CategoryListComponent, CategoryPlaylistsComponent,
      BackImageDirective], // была эта хуйня и ArtistModule или CollectionModule
  exports: [
    MainViewComponent
  ]
})
export class MainViewModule { }
