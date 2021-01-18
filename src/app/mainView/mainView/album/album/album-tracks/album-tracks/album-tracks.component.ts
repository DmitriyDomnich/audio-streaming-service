import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
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
  constructor(
    private tracksService: TracksService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('explicit', sanitizer.bypassSecurityTrustHtml(this.explicitIcon));
  }
  columnsToDisplay = ['title', 'explicit', 'duration'];
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
      this.tracks = data;
      this.dataSource = new MatTableDataSource(this.tracks);
      // console.log(this.tracks);
    });
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
