import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from 'src/app/shared/models/services/tracks.service';
import { Track } from 'src/app/shared/models/track';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PlayerService } from 'src/app/shared/models/services/player.service';
import { FollowServiceService } from 'src/app/shared/models/services/follow-service.service';
import { isArray } from 'lodash';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss'],
})
export class PlaylistTracksComponent implements OnChanges {
  @Input() id = '';
  @Input() tracks: Track[] = [];
  isLikedTracks: boolean[] = [];
  total = 0;
  followed = false;
  columnsToDisplay = [
    'playButton',
    'isLiked',
    'title',
    'explicit',
    'artists',
    'album',
    'duration',
    'added_at',
  ];
  dataSource = new MatTableDataSource(this.tracks);
  constructor(
    private tracksService: TracksService,
    private acticatedRoute: ActivatedRoute,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private playerService: PlayerService,
    private followService: FollowServiceService
  ) {
    iconRegistry.addSvgIconLiteral(
      'explicit',
      sanitizer.bypassSecurityTrustHtml(this.explicitIcon)
    );
  }

  // ngDoCheck(): void {
  //   this.tracksService.getTotalSongsNumber(this.id).subscribe(num => {
  //     console.log(num);
  //     this.total = num;
  //   });
  //   // console.log(this.total);
  //   this.tracksService.getPlaylistTracks(this.id).subscribe((tracks) => {
  //     this.tracks = tracks;
  //     this.dataSource = new MatTableDataSource(this.tracks);
  //   });
  // }
  explicitIcon = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
  <g>
  <g>
    <path d="M341.333,0H42.667C19.093,0,0,19.093,0,42.667v298.667C0,364.907,19.093,384,42.667,384h298.667
      C364.907,384,384,364.907,384,341.333V42.667C384,19.093,364.907,0,341.333,0z M256,128h-85.333v42.667H256v42.667h-85.333V256
      H256v42.667H128V85.333h128V128z"/>
  </g>
  </g>
  </svg>`;
  makeFavorite(id: string): void {
    this.followService.saveTrack(id).subscribe(() => {
      let i = 0;
      let bool = true;
      while (bool){
        if (this.tracks[i].id === id){
          this.tracks[i].isLiked = true;
          bool = false;
        }
        i++;
      }
    });
  }
  deleteFavorite(id: string): void{
    this.followService.deleteTrack(id).subscribe(() => {
      let i = 0;
      let bool = true;
      while (bool){
        if (this.tracks[i].id === id){
          this.tracks[i].isLiked = false;
          bool = false;
        }
        i++;
      }
    });
  }
  addTrackToQ(track: Track, event: MouseEvent): void{
    event.preventDefault();
    console.log('ADDDED ' + track);
    this.playerService.addToQueue(track.id).subscribe();
  }
  // isLiked(id: string): any{
  //   this.followService.checkIfSongLiked(id).subscribe(bool => {
  //     return bool;
  //   });
  // }
  deleteRow(track: Track): void{
    this.deleteFavorite(track.id);
    const index = this.dataSource.data.indexOf(track);
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.tracks);
  }
  ngOnChanges(): void {
    if (this.id === 'likedsongs') {
      this.tracksService.getLikedTracks().subscribe((data) => {
        this.tracks = data;
        for (const track of this.tracks) {
          track.isLiked = true;
        }

        this.dataSource = new MatTableDataSource(this.tracks);
      });
    } else {
      this.tracksService.getPlaylistTracks(this.id).subscribe((data) => {
        this.tracksService.getTotalSongsNumber(this.id).subscribe((total) => {
          this.isLikedTracks = [];
          if (total > 100) {
            this.total = 100;
          } else {
            this.total = total;
          }
          const instance: string[] = [];
          if (this.total <= 50) {
            for (let i = 0; i < this.total; i++) {
              instance[i] = data[i].id;
            }
            this.followService
              .checkIfSongLiked(instance)
              .subscribe((boolArray) => {
                this.isLikedTracks.push(...boolArray);
                this.tracks = data;
                for (let i = 0; i < this.tracks.length; i++) {
                  this.tracks[i].isLiked = this.isLikedTracks[i];
                }
                this.dataSource = new MatTableDataSource(this.tracks);
              });
          } else {
            for (let i = 0; i < 50; i++) {
              instance[i] = data[i].id;
            }
            this.followService
              .checkIfSongLiked(instance)
              .subscribe((boolArray) => {
                this.isLikedTracks.push(...boolArray);
                const secondArray = [];
                for (let i = 50; i < this.total; i++) {
                  secondArray[i - 50] = data[i].id;
                }
                this.followService
                  .checkIfSongLiked(secondArray)
                  .subscribe((secondBools) => {
                    this.isLikedTracks.push(...secondBools);
                    this.tracks = data;
                    for (let i = 0; i < this.tracks.length; i++) {
                      this.tracks[i].isLiked = this.isLikedTracks[i];
                    }
                    this.dataSource = new MatTableDataSource(this.tracks);
                    console.log(this.tracks);
                  });
              });
          }
        });
      });
    }
  }
  playSong(id: string, offset: number, songId: string): void {
    if (id === 'likedsongs') {
      this.playerService.playSong(songId).subscribe();
    } else {
      this.playerService.playSamePlaylistSongs(id, offset, 'album').subscribe();
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTimeFromMilliseconds(s: number): string {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secsFake = s % 60;
    s = (s - secsFake) / 60;
    const mins = s % 60;
    let secs = '';
    secsFake < 10 ? (secs = '0' + secsFake) : (secs = secsFake.toString());
    return mins + ':' + secs;
  }
  getArtistNames(artists: any): string[] {
    return artists.map((artist: any) => {
      return artist.name;
    });
  }
}
