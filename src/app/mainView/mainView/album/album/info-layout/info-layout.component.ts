import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';
import { AlbumsService } from 'src/app/shared/models/services/albums.service';
import { FollowServiceService } from 'src/app/shared/models/services/follow-service.service';

@Component({
  selector: 'app-info-layout',
  templateUrl: './info-layout.component.html',
  styleUrls: ['./info-layout.component.scss']
})
export class InfoLayoutComponent implements OnChanges {
  @Input() id = '';
  @Input() album: Album = {id: '', name: '', copyrights: ''};
  @Input() duration = 0;
  followed: boolean[] = [];
  constructor(
    private albumsService: AlbumsService,
    private followService: FollowServiceService
  ) { }

  ngOnChanges(): void{
    this.followService.checkIfAlbumFollowed(this.id).subscribe((boolArray) => {
      console.log('ONINIT');
      console.log(this.followed);
      this.followed = boolArray;
    });
  }
  likeAlbum(id: string): void{
    this.followService.saveAlbum(id).subscribe(() => {
      console.log('LIKE');
      console.log(this.followed);
      this.followed[0] = true;
    });
  }
  dislikeAlbum(id: string): void{
    this.followService.deleteAlbum(id).subscribe(() => {
      console.log('DIS');
      console.log(this.followed);
      this.followed[0] = false;
    });
  }
}
