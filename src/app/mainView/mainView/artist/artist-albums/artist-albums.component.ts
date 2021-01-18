import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';
import { ArtistsService } from 'src/app/shared/models/services/artists.service';

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.scss']
})
export class ArtistAlbumsComponent implements OnChanges {
  @Input() id = '';
  albums: Album[] = [];
  constructor(
    private artistsService: ArtistsService
  ) { }

  ngOnChanges(): void{
    this.artistsService.getArtistAlbums(this.id).subscribe(data => {
      const instanceArray = [];
      let j = 0;
      for (let i = 0; i < data.length; i += 2) {
        instanceArray[j] = data[i];
        j++;
      }
      this.albums = instanceArray;
      console.log('albums');
      console.log(this.albums);
    });
  }

}
