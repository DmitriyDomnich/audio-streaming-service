import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/shared/models/playlist';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoryPlaylistsService {
  constructor(private http: HttpClient) {}
  getPLaylistsByCategoryId(id: string): Observable<Playlist[]> {
    const token = localStorage.getItem('token');
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const httpOptions = {
      headers: heads,
      params: {
        country: 'US',
      },
    };
    return this.http
      .get(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, httpOptions)
      .pipe(
        map((data: any) => {
          const playlistsLiteral = 'playlists';
          const itemsLiteral = 'items';
          const playlists = data[playlistsLiteral];
          const items = playlists[itemsLiteral];
          return items.map((playlist: any) => {
              return {
                  id: playlist.id, name: playlist.name,
                  description: playlist.description, image: playlist.images[0].url
              };
          });
        })
      );
  }
}
