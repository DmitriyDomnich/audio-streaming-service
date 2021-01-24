import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/shared/models/artist';
import { ArtistsService } from 'src/app/shared/models/services/artists.service';

@Component({
  selector: 'app-user-artists',
  templateUrl: './user-artists.component.html',
  styleUrls: ['./user-artists.component.scss']
})
export class UserArtistsComponent implements OnInit {
  artists: Artist[] = [];
  constructor(
    private artistService: ArtistsService
  ) { }
  getArtistNames(artists: any): string[] {
    return artists.map((artist: any) => {
      return artist.name;
    });
  }
  ngOnInit(): void{
    this.artistService.getUserFollowedArtists().subscribe(data => {
      this.artists = data;
    });
  }

}
