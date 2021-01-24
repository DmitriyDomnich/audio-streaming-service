import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { isArray } from 'lodash';
import { Artist } from 'src/app/shared/models/artist';
import { ArtistsService } from 'src/app/shared/models/services/artists.service';
import { FollowServiceService } from 'src/app/shared/models/services/follow-service.service';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss'],
})
export class ArtistInfoComponent implements OnChanges {
  @Input() id = '';
  artist: Artist = {name: '', id: '', followers: 0};
  followed: boolean[] = [];
  constructor(
    private artistsService: ArtistsService,
    private followService: FollowServiceService
  ) {}
  followArtist(id: string): void{
    this.followService.followArtist(id).subscribe(() => {
      this.followed[0] = true;
    });
  }
  unfollowArtist(id: string): void{
    this.followService.unfollowArtist(id).subscribe(() => {
      this.followed[0] = false;
    });
  }
  ngOnChanges(): void{
    this.artistsService.getArtistById(this.id).subscribe(data => {
      this.artist = data;
      this.followService.checkIfArtistFollowed(this.id).subscribe(bool => {
        this.followed = bool;
      });
    });
  }
}
