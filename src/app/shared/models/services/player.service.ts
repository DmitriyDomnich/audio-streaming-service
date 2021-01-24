import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../player';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  changePlayback(): Observable<any>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const body = {
      device_ids: [
        localStorage.getItem('_spharmony_device_id')
      ]
    };
    return this.http.put(`https://api.spotify.com/v1/me/player`, body, {headers: heads});
  }
  resumePlayer(): Observable<any>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`https://api.spotify.com/v1/me/player/play`, null, { headers: heads });
  }
  playSamePlaylistSongs(id: string, offset: number, item: string): Observable<any>{
    console.log('id');
    console.log(id);
    console.log('offset = ');
    console.log((offset - 1));
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const body = {
      context_uri:
        `spotify:${item}:${id}`,
      offset: {
        position: offset - 1
      }
    };
    return this.http.put(`https://api.spotify.com/v1/me/player/play`, body, { headers: heads });
  }
  playSong(id: string): Observable<any>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const body = {
      uris: [
        `spotify:track:${id}`
      ]
    };
    return this.http.put(`https://api.spotify.com/v1/me/player/play`, body, { headers: heads });
  }
  pausePlayer(): Observable<any>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`https://api.spotify.com/v1/me/player/pause`, null, {headers: heads});
  }
  skipToNext(): Observable<any>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(`https://api.spotify.com/v1/me/player/next`, null, {headers: heads});
  }
  skipToPrevious(): Observable<any>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(`https://api.spotify.com/v1/me/player/previous`, null, {headers: heads});
  }
  seekToPosition(position: number): Observable<any>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const body = {
      position_ms: `${position}`
    };
    return this.http.put(`https://api.spotify.com/v1/me/player/seek`, body, {headers: heads});
  }
  changeRepeatMode(repeat: boolean): Observable<any>{
    let state;
    repeat ? state = 'track' : state = 'off';
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const httpParams = new HttpParams().set('state', `${state}`);
    return this.http.put(`https://api.spotify.com/v1/me/player/repeat`, null, { headers: heads, params: httpParams });
  }
  setVolume(volume: number): Observable<any>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    console.log(volume + ' - volume');
    const httpParams = new HttpParams().set('volume_percent', `${+volume}`);
    return this.http.put(`https://api.spotify.com/v1/me/player/volume`, null, { headers: heads, params: httpParams });
  }
  toggleShuffle(activated: boolean): Observable<any>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const httpParams = new HttpParams().set('state', `${activated}`);
    return this.http.put(`https://api.spotify.com/v1/me/player/shuffle`, null, {headers: heads, params: httpParams});
  }
  addToQueue(uri: string): Observable<any>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const httpParams = new HttpParams().set('uri', `spotify:track:${uri}`);
    return this.http.post(`https://api.spotify.com/v1/me/player/queue`, null, { headers: heads, params: httpParams} );
  }
  getCurrentPlayer(): Observable<Player>{
    const heads = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`https://api.spotify.com/v1/me/player`, {headers: heads}).pipe(
      map((player: any) => {
        console.log(player);
        return {
          playerState : {
            shuffle: player.shuffle_state,
            repeat: player.repeat_state,
            isPlaying: player.is_playing,
            volume: player.device.volume
          },
          currentSong: {
            id: player.item.id,
            name: player.item.name,
            progress: player.progress_ms,
            album: {
              id: player.item.album.id,
              name: player.item.album.name,
              image: player.item.album.images[2].url
            },
            artists: player.item.artists.map((artist: any) => {
              return {
                id: artist.id,
                name: artist.name,
              };
            })
          }
        };
      })
    );
  }
}
