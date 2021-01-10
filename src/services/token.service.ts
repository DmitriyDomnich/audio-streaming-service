import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService{

    private _authPath = 'https://accounts.spotify.com/authorize';
    private _client_id = 'aa147ff1b7ce4ae49ebb544027485f17';
    private _redirect_uri = 'http://localhost:4200/';
    private _scopes = [
        'ugc-image-upload',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-top-read',
        'playlist-modify-public',
        'user-modify-playback-state',
        'playlist-modify-private',
        'user-follow-modify',
        'user-read-currently-playing',
        'user-follow-read',
        'user-library-modify',
        'playlist-read-private',
        'user-read-email',
        'user-read-private',
        'user-library-read',
        'playlist-read-collaborative'
    ];
    private _loginUrl = `${this._authPath}?client_id=${this._client_id}&redirect_uri=${this._redirect_uri}&scope=${this._scopes.join('%20')}&response_type=token`;
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    setAuthToken(): void{
        const substr = window.location.hash.substring(1).split('&');
        setTimeout(() => {
            localStorage.setItem('token', substr[0].split('=')[1]);
            window.location.hash = '';
        });
        const now = new Date();
        localStorage.setItem('creationTime', `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${this.getTime(now)}`);
    }

    getLoginUrl(): void{
        window.location.href = this._loginUrl;
    }

    refreshToken(): void{
        const currentRoute = this.router.url;
        window.location.href = this._loginUrl;
        this.setAuthToken();
        this.router.navigate([`${currentRoute}`]);
    }

    checkToken(): boolean{
        const now = new Date();
        const currentTime = this.getTime(now);
        if (Date.parse(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${currentTime}`) >= (Date.parse(`${localStorage.getItem('creationTime')}`) + (3600 * 1000))){
            return true;
        }
        return false;
    }

    getTime(date: Date): string{
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
}
