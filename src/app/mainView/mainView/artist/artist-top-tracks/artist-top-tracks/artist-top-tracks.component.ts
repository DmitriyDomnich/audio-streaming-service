import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ArtistsService } from 'src/app/shared/models/services/artists.service';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-artist-top-tracks',
  templateUrl: './artist-top-tracks.component.html',
  styleUrls: ['./artist-top-tracks.component.scss'],
})
export class ArtistTopTracksComponent implements OnChanges {
  @Input() id = '';
  tracks: Track[] = [];
  constructor(
    private artistsService: ArtistsService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'explicit',
      sanitizer.bypassSecurityTrustHtml(this.explicitIcon)
    );
  }
  columnsToDisplay = ['index', 'image', 'title', 'duration'];
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
  ngOnChanges(): void {
    this.artistsService.getArtistTopTracks(this.id).subscribe((data) => {
      const instanceArray = [];
      for (let i = 0; i < 5; i++) {
        instanceArray[i] = data[i];
      }
      this.tracks = instanceArray;
      console.log('tracks');
      console.log(this.tracks);
    });
  }
}
