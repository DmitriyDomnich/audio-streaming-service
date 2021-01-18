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

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss'],
})
export class PlaylistTracksComponent implements OnChanges {
  @Input() id = '';
  @Input() tracks: Track[] = [];
  total = 0;
  columnsToDisplay = [
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
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('explicit', sanitizer.bypassSecurityTrustHtml(this.explicitIcon));
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
  ngOnChanges(): void {
    if (this.id === 'likedsongs') {
      this.tracksService.getLikedTracks().subscribe((data) => {
        this.tracks = data;
        this.dataSource = new MatTableDataSource(this.tracks);
      });
    } else {
      this.tracksService.getPlaylistTracks(this.id).subscribe((data) => {
        this.tracks = data;
        this.dataSource = new MatTableDataSource(this.tracks);
        console.log(this.tracks);
      });
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
