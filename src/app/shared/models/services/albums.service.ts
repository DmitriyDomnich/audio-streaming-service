import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Album } from '../album';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(private http: HttpClient) {}

  getAlbumById(id: string): Observable<Album>{
    const token = localStorage.getItem('token');
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`https://api.spotify.com/v1/albums/${id}`, {headers: heads})
      .pipe(map((album: any) => {
        return {
          id: album.id, image: album.images[0].url, copyrights: album.copyrights[0].text,
          artists: album.artists.map((artist: any) => {
            return {
              id: artist.id,
              name: artist.name
            };
          }),
          releaseDate: album.release_date,
          albumType: album.album_type,
          name: album.name
        };
      }));
  }

  getUserAlbums(): Observable<Album[]> {
    const token = localStorage.getItem('token');
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http
      .get('https://api.spotify.com/v1/me/albums', { headers: heads })
      .pipe(
        map((data: any) => {
          const literal = 'items';
          const items = data[literal];
          return items.map((album: any) => {
            return {
              id: album.album.id,
              name: album.album.name,
              image: album.album.images[0].url,
              artists: album.album.artists.map((artist: any) => {
                return {
                  id: artist.id,
                  name: artist.name,
                };
              }),
            };
          });
        })
      );
  }
}
