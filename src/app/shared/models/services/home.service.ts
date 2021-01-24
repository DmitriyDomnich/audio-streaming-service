import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from '../album';
import { Artist } from '../artist';
import { Playlist } from '../playlist';
import { Track } from '../track';
import { ArtistsService } from './artists.service';
import { TracksService } from './tracks.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private http: HttpClient,
    private artistsService: ArtistsService,
    private tracksService: TracksService
  ) {}
  getAlbumsShortcuts(): Observable<Album[]> {
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        limit: '4',
      },
    };
    return this.http
      .get(`https://api.spotify.com/v1/me/top/tracks`, httpOptions)
      .pipe(
        map((data: any) => {
          const itemsLit = 'items';
          const items = data[itemsLit];
          return items.map((obj: any) => {
            //  console.log(album);
            return {
              id: obj.album.id,
              name: obj.name,
              image: obj.album.images[0].url,
            };
          });
        })
      );
  }
  getArtistsShortcuts(): Observable<Artist[]> {
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        limit: '4',
      },
    };
    return this.http
      .get(`https://api.spotify.com/v1/me/top/artists`, httpOptions)
      .pipe(
        map((data: any) => {
          const itemsLit = 'items';
          const items = data[itemsLit];
          return items.map((artist: any) => {
            return {
              id: artist.id,
              image: artist.images[0].url,
              name: artist.name,
            };
          });
        })
      );
  }
  getNewReleases(): Observable<Album[]> {
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        limit: '12',
      },
    };
    return this.http
      .get(`https://api.spotify.com/v1/browse/new-releases`, httpOptions)
      .pipe(
        map((data: any) => {
          const albumsLit = 'albums';
          const itemsLit = 'items';
          const albums = data[albumsLit];
          const items = albums[itemsLit];
          return items.map((album: any) => {
            return {
              id: album.id,
              name: album.name,
              image: album.images[0].url,
              artists: album.artists.map((artist: any) => {
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
  getFeaturedPlaylists(): Observable<Playlist[]> {
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    const httpOptions = {
      headers: heads,
      params: {
        limit: '10',
      },
    };
    return this.http
      .get(`https://api.spotify.com/v1/browse/featured-playlists`, httpOptions)
      .pipe(
        map((obj: any) => {
          const playlistsLit = 'playlists';
          const itemsLit = 'items';
          const playlists = obj[playlistsLit];
          const items = playlists[itemsLit];
          return items.map((playlist: any) => {
            return {
              id: playlist.id,
              name: playlist.name,
              image: playlist.images[0].url,
              description: playlist.description,
            };
          });
        })
      );
  }
  randomChoose(max: number): string {
    return (Math.random() * max).toFixed(0);
  }
  getGenreSeed(): Observable<string> {
    const heads = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http
      .get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
        headers: heads,
      })
      .pipe(
        map((obj: any) => {
          const genresLit = 'genres';
          const genres = obj[genresLit];
          const random = +this.randomChoose(genres.length);
          return genres.find((item: any, index: any) => {
            if (index === random) {
              console.log('GENRE SEED');
              console.log(item);
              return item;
            }
          });
        })
      );
  }
  getArtistsSeeds(): any {
    this.artistsService.getUserFollowedArtists().subscribe((data) => {
      const randomOne = +this.randomChoose(data.length);
      const randomTwo = +this.randomChoose(data.length);
      const idArray = [];
      idArray.push(
        data.find((item: any, index: any) => {
          console.log('FIRST ARTIST SEED');
          console.log(index + ' - ' + randomOne);
          if (index === randomOne) {
            return item.id;
          }
        })
      );
      idArray.push(
        data.find((item: any, index: any) => {
          console.log('SECOND ARTIST SEED');
          console.log(index + ' - ' + randomOne);
          if (index === randomTwo) {
            console.log(index);
            return item.id;
          }
        })
      );
      console.log('ARTIST SEEDS');
      console.log(idArray);
      return idArray;
    });
  }
  getTracksSeeds(): any {
    return this.tracksService.getLikedTracks().subscribe((data) => {
      const randomOne = +this.randomChoose(data.length);
      const randomTwo = +this.randomChoose(data.length);
      const idArray = [];
      idArray.push(
        data.find((item: any, index: any) => {
          if (index === randomOne) {
            return item.id;
          }
        })
      );
      idArray.push(
        data.find((item: any, index: any) => {
          if (index === randomTwo) {
            return item.id;
          }
        })
      );
      console.log('TRACK SEEDS');
      console.log(idArray);
      return idArray;
    });
  }
  // getRecommendations(): any{
  //   const heads = new HttpHeaders().set(
  //     'Authorization',
  //     'Bearer ' + localStorage.getItem('token')
  //   );
  //   const httpOptions = {
  //     headers: heads,
  //     params: {
  //       limit: '40',
  //     },
  //   };
  //   this.getGenreSeed().subscribe((genreSeed: any) => {
  //     console.log('seed opeqe Genre');
  //     console.log(genreSeed);
  //     const seed_tracks = this.getTracksSeeds();
  //     const seed_artists = this.getArtistsSeeds();
  //     return this.http
  //       .get(
  //         `https://api.spotify.com/v1/recommendations?seed_genres=${genreSeed}&seed_artists=${seed_artists}&seed_tracks=${seed_tracks}`,
  //         { headers: heads }
  //       )
  //       .pipe(
  //         map((obj: any) => {
  //           const tracksLit = 'tracks';
  //           const items = obj[tracksLit];
  //           return items.map((track: any) => {
  //             return {
  //               id: track.id,
  //               album: {
  //                 id: track.album.id,
  //                 name: track.album.name,
  //                 albumType: track.album.album_type,
  //               },
  //               trackNum: track.track_number,
  //               name: track.name,
  //               artists: track.artists.map((artist: any) => {
  //                 return {
  //                   id: artist.id,
  //                   name: artist.name,
  //                 };
  //               }),
  //               isExplicit: track.explicit,
  //               duration: track.duration_ms,
  //             };
  //           });
  //         })
  //       );
  //   });
  // }
}
