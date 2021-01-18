import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Track } from '../track';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  offset = 0;
  limit = 0;
  constructor(private http: HttpClient) {}

  getTotalSongsNumber(id: string): Observable<number> {
    const token = localStorage.getItem('token');
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const httpOptions = {
      headers: heads,
      params: { fields: `total` },
    };
    return this.http
      .get(`https://api.spotify.com/v1/playlists/${id}/tracks`, httpOptions)
      .pipe(
        map((obj: any) => {
          return obj.total;
        })
      );
  }
  getAlbumTracks(id: string): Observable<Track[]> {
    const token = localStorage.getItem('token');
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const httpOptions = {
      headers: heads,
      params: {
        limit: '50',
      },
    };
    return this.http.get(`https://api.spotify.com/v1/albums/${id}/tracks`, httpOptions).pipe(
      map((data: any) => {
        const itemsLit = 'items';
        const items = data[itemsLit];
        return items.map((track: any) => {
          return {
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist: any) => {
              return { id: artist.id, name: artist.name };
            }),
            isExplicit: track.explicit,
            duration: track.duration_ms
          };
        });
      })
    );
  }
  getLikedTracks(): Observable<Track[]> {
    const token = localStorage.getItem('token');
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const httpOptions = {
      headers: heads,
      params: {
        limit: '50',
      },
    };
    return this.http
      .get('https://api.spotify.com/v1/me/tracks', httpOptions)
      .pipe(
        map((playlist: any) => {
          const literal = 'items';
          const items = playlist[literal];
          return items.map((item: any) => {
            return {
              id: item.track.id,
              album: {
                id: item.track.album.id,
                name: item.track.album.name,
                albumType: item.track.album.album_type,
              },
              name: item.track.name,
              artists: item.track.artists.map((artist: any) => {
                return {
                  id: artist.id,
                  name: artist.name,
                };
              }),
              isExplicit: item.track.explicit,
              duration: item.track.duration_ms,
              added_at: item.added_at,
            };
          });
        })
      );
  }
  getPlaylistTracks(id: string): Observable<Track[]> {
    const token = localStorage.getItem('token');
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    // let offs = 100;
    // const tracksArray: Track[] = [];
    // let httpOptions: {};
    const httpOptions = {
      headers: heads,
      params: {
        fields: `items(added_at,track(id,images,name,duration_ms,explicit,album(name,id,album_type),artists(id,name)))`,
      },
    };
    // while (this.offset !== total) {
    //   if (total <= offs) {
    //     const instance = +(total / 100).toFixed(2);
    //     this.limit = +(instance - Math.floor(instance)).toFixed(2) * 100;
    //   } else {
    //     this.limit = 100;
    //     offs += 100;
    //   }
    //   httpOptions = {
    //     headers: heads,
    //     params: {
    //       fields: `items(added_at,track(id,images,name,duration_ms,explicit,album(name,id,album_type),artists(id,name)))`,
    //       offset: this.offset,
    //       limit: this.limit,
    //     },
    //   };
    //   this.http
    //     .get(`https://api.spotify.com/v1/playlists/${id}/tracks`, httpOptions)
    //     .pipe(
    //       map((playlist: any) => {
    //         const literal = 'items';
    //         const items = playlist[literal];
    //         return items.map((item: any) => {
    //           return {
    //             id: item.track.id,
    //             album: {
    //               id: item.track.album.id,
    //               name: item.track.album.name,
    //               albumType: item.track.album.album_type,
    //             },
    //             name: item.track.name,
    //             artists: item.track.artists.map((artist: any) => {
    //               return {
    //                 id: artist.id,
    //                 name: artist.name,
    //               };
    //             }),
    //             isExplicit: item.track.explicit,
    //             duration: item.track.duration_ms,
    //             added_at: item.added_at,
    //           };
    //         });
    //       })
    //     )
    //     .subscribe((data) => {
    //       console.log('data - ' + data[0]);
    //       tracksArray.push(data);
    //     } );
    //   // console.log(this.offset + ' --- ' + this.limit);
    //   this.offset += this.limit;
    // }
    // this.offset = 0;
    // this.limit = 0;
    // console.log('arr: ' + tracksArray.length);
    // return tracksArray;
    return this.http
      .get(`https://api.spotify.com/v1/playlists/${id}/tracks`, httpOptions)
      .pipe(
        map((playlist: any) => {
          const literal = 'items';
          const items = playlist[literal];
          return items.map((item: any) => {
            return {
              id: item.track.id,
              album: {
                id: item.track.album.id,
                name: item.track.album.name,
                albumType: item.track.album.album_type,
              },
              name: item.track.name,
              artists: item.track.artists.map((artist: any) => {
                return {
                  id: artist.id,
                  name: artist.name,
                };
              }),
              isExplicit: item.track.explicit,
              duration: item.track.duration_ms,
              added_at: item.added_at,
            };
          });
        })
      );
  }
}
