import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/services/token.service';
import { Playlist } from '../playlist';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  getUserPlaylists(): Observable<Playlist[]>{
    const token = localStorage.getItem('token');
    const headss = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get('https://api.spotify.com/v1/me/playlists', { headers: headss }).pipe(map((data: any) => {
      const literal = 'items';
      const items = data[literal];
      return items.map(
        (playlist: any) => {
          return {id: playlist.id, name: playlist.name };
        }
            // description: playlist.description, image: playlist.images[0].url,
            // owner: {id: playlist.owner.id, name: playlist.owner[displayName]},
            // public: playlist.public};
      );
    }));
  }
  getPlaylistById(id: string): Observable<Playlist>{
    const token = localStorage.getItem('token');
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`https://api.spotify.com/v1/playlists/${id}`, {headers: heads}).pipe(
      map((playlist: any) => {
        const displayName = 'display_name';
        return {
          id: playlist.id, name: playlist.name, description: playlist.description, image: playlist.images[0].url,
          user: {id: playlist.owner.id, name: playlist.owner[displayName]},
          followers: playlist.followers.total
        };
      })
    );
  }
}
