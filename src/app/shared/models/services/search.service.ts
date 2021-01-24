import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Search } from '../search';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  searchItems(term: string): Observable<Search> {
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        q: `${term}`,
        type: 'track,artist,album,playlist',
        limit: `5`,
      },
    };
    return this.http.get(`https://api.spotify.com/v1/search`, httpOptions).pipe(
      map((obj: any) => {
        return {
          tracks: obj.tracks.items.map((track: any) => {
            return {
              id: track.id,
              name: track.name,
              album: {
                id: track.album.id,
                name: track.album.name,
                image: track.album.images[1].url,
              },
              artists: track.artists.map((artist: any) => {
                return {
                  id: artist.id,
                  name: artist.name,
                };
              }),
              isExplicit: track.explicit,
              duration: track.duration_ms
            };
          }),
          albums: obj.albums.items.map((album: any) => {
            return {
              id: album.id,
              name: album.name,
              image: album.images[0].url,
              artists: album.artists.map((artist: any) => {
                return {
                  id: artist.id,
                  name: artist.name
                };
              }),
            };
          }),
          artists: obj.artists.items.map((artist: any) => {
            return {
              id: artist.id,
              name: artist.name,
              image: artist.images[0]?.url,
            };
          }),
          playlists: obj.playlists.items.map((playlist: any) => {
            return {
              id: playlist.id,
              name: playlist.name,
              image: playlist.images[0].url
            };
          })
        };
      })
    );
  }
}
