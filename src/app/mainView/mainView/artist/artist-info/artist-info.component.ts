import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Artist } from 'src/app/shared/models/artist';
import { ArtistsService } from 'src/app/shared/models/services/artists.service';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss'],
})
export class ArtistInfoComponent implements OnChanges {
  @Input() id = '';
  artist: Artist = {name: '', id: '', followers: 0};
  constructor(
    private artistsService: ArtistsService
  ) {}

  ngOnChanges(): void{
    this.artistsService.getArtistById(this.id).subscribe(data => {
      this.artist = data;
      console.log('info');
      console.log(this.artist);
    });
  }
}
