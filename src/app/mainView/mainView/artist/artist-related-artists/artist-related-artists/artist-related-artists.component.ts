import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Artist } from 'src/app/shared/models/artist';
import { ArtistsService } from 'src/app/shared/models/services/artists.service';

@Component({
  selector: 'app-artist-related-artists',
  templateUrl: './artist-related-artists.component.html',
  styleUrls: ['./artist-related-artists.component.scss']
})
export class ArtistRelatedArtistsComponent implements OnChanges {
  @Input() id = '';
  artists: Artist[] = [];
  constructor(
    private artistsService: ArtistsService
  ) { }

  ngOnChanges(): void {
    this.artistsService.getArtistRelatedArtists(this.id).subscribe(data => {
      const instanceArray = [];
      for (let i = 0; i < data.length / 2; i++) {
        instanceArray[i] = data[i];
      }
      this.artists = instanceArray;
      console.log('related');
      console.log(this.artists);
    });
  }

}
