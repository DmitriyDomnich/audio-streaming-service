import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../artist';
import { map } from 'rxjs/operators';
import { Track } from '../track';
import { Album } from '../album';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  constructor(private http: HttpClient) {}

  getArtistById(id: string): Observable<Artist> {
    const token = localStorage.getItem('token');
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http
      .get(`https://api.spotify.com/v1/artists/${id}`, { headers: heads })
      .pipe(
        map((artist: any) => {
          return {
            id: artist.id,
            name: artist.name,
            image: artist.images[0].url,
            followers: artist.followers.total,
          };
        })
      );
  }
  getArtistTopTracks(id: string): Observable<Track[]> {
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        market: 'UA',
      },
    };
    return this.http
      .get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, httpOptions)
      .pipe(
        map((data: any) => {
          const tracksLiteral = 'tracks';
          const items = data[tracksLiteral];
          return items.map((track: any) => {
            return {
              id: track.id,
              image: track.album.images[2].url,
              name: track.name,
              isExplicit: track.explicit,
              duration: track.duration_ms,
            };
          });
        })
      );
  }
  getArtistRelatedArtists(id: string): Observable<Artist[]> {
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http
      .get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
        headers: heads,
      })
      .pipe(
        map((data: any) => {
          const artistsLiteral = 'artists';
          const items = data[artistsLiteral];
          return items.map((artist: any) => {
            return {
              id: artist.id,
              name: artist.name,
              image: artist.images[0].url,
            };
          });
        })
      );
  }
  getArtistAlbums(id: string): Observable<Album[]>{
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        include_groups: 'album,single,appears_on',
        limit: '31'
      },
    };
    return this.http.get(`https://api.spotify.com/v1/artists/${id}/albums`, httpOptions).pipe(
      map((data: any) => {
        const itemsLiteral = 'items';
        const items = data[itemsLiteral];
        return items.map((album: any) => {
          return {
            id: album.id, name: album.name, image: album.images[0].url
          };
        });
      })
    );
  }
}
