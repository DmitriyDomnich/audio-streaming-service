import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class FollowServiceService {
  constructor(private http: HttpClient) {}

  followPlaylist(id: string): Observable<any> {
    const heads = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: heads,
      params: {
        type: 'artist',
      },
    };
    return this.http.put(
      `https://api.spotify.com/v1/playlists/${id}/followers`,
      null,
      httpOptions
    );
  }
  followArtist(id: string): Observable<any>{
    const heads = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: heads,
      params: {
        type: 'artist',
        ids: [
          `${id}`
        ]
      },
    };
    return this.http.put(`https://api.spotify.com/v1/me/following`, null, httpOptions);
  }

  unfollowPlaylist(id: string): Observable<any>{
    const heads = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');

    return this.http.delete(
      `https://api.spotify.com/v1/playlists/${id}/followers`,
      { headers: heads }
    );
  }

  unfollowArtist(id: string): Observable<any>{
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        ids: `${id}`,
        type: 'artist',
      },
    };
    return this.http.delete(
      `https://api.spotify.com/v1/me/following`,
      httpOptions
    );
  }

  checkIfArtistFollowed(id: string): Observable<boolean[]>{
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        ids: `${id}`,
        type: 'artist',
      },
    };
    return this.http
      .get(
        `https://api.spotify.com/v1/me/following/contains`,
        httpOptions
      )
      .pipe(
        map((bool: any) => {
          return bool;
        })
      );
  }
  checkIfSongLiked(id: string[]): Observable<boolean[]>{
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        ids: `${id}`
      },
    };
    return this.http
      .get(
        `https://api.spotify.com/v1/me/tracks/contains`,
        httpOptions
      )
      .pipe(
        map((bool: any) => {
          return bool;
        })
      );
  }
  checkIfAlbumFollowed(id: string): Observable<boolean[]>{
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        ids: `${id}`
      },
    };
    return this.http
      .get(
        `https://api.spotify.com/v1/me/albums/contains`,
        httpOptions
      )
      .pipe(
        map((bool: any) => {
          return bool;
        })
      );
  }
  checkIfPlaylistFollowed(id: string, userId: string): Observable<boolean[]> {
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        ids: `${userId}`,
        type: 'artist',
      },
    };
    return this.http
      .get(
        `https://api.spotify.com/v1/playlists/${id}/followers/contains`,
        httpOptions
      )
      .pipe(
        map((bool: any) => {
          return bool;
        })
      );
  }
  getCurrentUserId(): Observable<User> {
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http
      .get('https://api.spotify.com/v1/me', { headers: heads })
      .pipe(
        map((data: any) => {
          return {
            id: data.id,
            name: data.display_name,
          };
        })
      );
  }
  saveTrack(id: string): Observable<any>{
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        ids: `${id}`
      },
    };
    return this.http.put(`https://api.spotify.com/v1/me/tracks`, null, httpOptions);
  }
  deleteTrack(id: string): Observable<any>{
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        ids: `${id}`
      },
    };
    return this.http.delete(`https://api.spotify.com/v1/me/tracks`, httpOptions);
  }
  saveAlbum(id: string): Observable<any>{
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        ids: `${id}`
      },
    };
    return this.http.put(`https://api.spotify.com/v1/me/albums`, null, httpOptions);
  }
  deleteAlbum(id: string): Observable<any>{
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        ids: `${id}`
      },
    };
    return this.http.delete(`https://api.spotify.com/v1/me/albums`, httpOptions);
  }

}
