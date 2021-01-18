import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection.component';
import { UserAlbumsComponent } from './user-albums/user-albums/user-albums.component';
import { UserArtistsComponent } from './user-artists/user-artists/user-artists.component';
import { UserLikedTracksComponent } from './user-liked-tracks/user-liked-tracks/user-liked-tracks.component';

const routes: Routes = [
  { path: 'collection',
    component: CollectionComponent,
    children: [
      { path: '', redirectTo: 'likedtracks', pathMatch: 'full' },
      { path: 'likedtracks', component: UserLikedTracksComponent},
      { path: 'albums', component: UserAlbumsComponent },
      { path: 'artists', component: UserArtistsComponent }
    ]
 },
];

export const CollectionRoutes = RouterModule.forChild(routes);
