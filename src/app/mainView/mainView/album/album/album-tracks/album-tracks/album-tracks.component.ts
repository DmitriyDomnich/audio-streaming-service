import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { AlbumsService } from 'src/app/shared/models/services/albums.service';
import { FollowServiceService } from 'src/app/shared/models/services/follow-service.service';
import { PlayerService } from 'src/app/shared/models/services/player.service';
import { TracksService } from 'src/app/shared/models/services/tracks.service';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-album-tracks',
  templateUrl: './album-tracks.component.html',
  styleUrls: ['./album-tracks.component.css'],
})
export class AlbumTracksComponent implements OnChanges {
  @Input() id = '';
  tracks: Track[] = [];
  @Input() copyrights = '';
  isLikedTracks: boolean[] = [];
  total = 0;
  constructor(
    private tracksService: TracksService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private playerService: PlayerService,
    private followService: FollowServiceService,
    private albumsService: AlbumsService
  ) {
    iconRegistry.addSvgIconLiteral(
      'explicit',
      sanitizer.bypassSecurityTrustHtml(this.explicitIcon)
    );
    iconRegistry.addSvgIconLiteral(
      'play',
      sanitizer.bypassSecurityTrustHtml(this.playButton)
    );
  }
  playButton = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
   <path d="M256,0C114.833,0,0,114.844,0,256s114.833,256,256,256s256-114.844,256-256S397.167,0,256,0z M357.771,264.969
     l-149.333,96c-1.75,1.135-3.771,1.698-5.771,1.698c-1.75,0-3.521-0.438-5.104-1.302C194.125,359.49,192,355.906,192,352V160
     c0-3.906,2.125-7.49,5.563-9.365c3.375-1.854,7.604-1.74,10.875,0.396l149.333,96c3.042,1.958,4.896,5.344,4.896,8.969
     S360.813,263.01,357.771,264.969z"/>
</svg>`;
  columnsToDisplay = [
    'index',
    'isLiked',
    'playButton',
    'title',
    'explicit',
    'duration',
  ];
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
  dataSource = new MatTableDataSource(this.tracks);
  ngOnChanges(): void {
    this.tracksService.getAlbumTracks(this.id).subscribe((data) => {

        this.isLikedTracks = [];
        if (data.length > 100) {
          this.total = 100;
        } else {
          this.total = data.length;
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
  }
  addTrackToQ(track: Track, event: MouseEvent): void{
    event.preventDefault();
    console.log('ADDDED ' + track);
    this.playerService.addToQueue(track.id).subscribe();
  }
  makeFavorite(id: string): void {
    this.followService.saveTrack(id).subscribe(() => {
      let i = 0;
      let bool = true;
      while (bool) {
        if (this.tracks[i].id === id) {
          this.tracks[i].isLiked = true;
          bool = false;
        }
        i++;
      }
    });
  }
  deleteFavorite(id: string): void {
    this.followService.deleteTrack(id).subscribe(() => {
      let i = 0;
      let bool = true;
      while (bool) {
        if (this.tracks[i].id === id) {
          this.tracks[i].isLiked = false;
          bool = false;
        }
        i++;
      }
    });
  }
  playSong(id: string, offset: number): void {
    this.playerService.playSamePlaylistSongs(id, offset, 'album').subscribe();
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
