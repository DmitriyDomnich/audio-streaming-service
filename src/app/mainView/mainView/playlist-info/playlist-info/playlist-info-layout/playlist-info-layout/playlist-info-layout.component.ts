import { AfterContentChecked, AfterViewChecked, Component, DoCheck, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Playlist } from 'src/app/shared/models/playlist';
import { FollowServiceService } from 'src/app/shared/models/services/follow-service.service';
import { PlaylistsService } from 'src/app/shared/models/services/playlists.service';
import { TracksService } from 'src/app/shared/models/services/tracks.service';

@Component({
  selector: 'app-playlist-info-layout',
  templateUrl: './playlist-info-layout.component.html',
  styleUrls: ['./playlist-info-layout.component.css']
})
export class PlaylistInfoLayoutComponent implements OnChanges {
  @Input() id = '';


  playlistInfo: Playlist = {id: '', name: ''};
  total = 0;
  followed: boolean[] = [];
  constructor(
    private playlistsService: PlaylistsService,
    private tracksService: TracksService,
    private followService: FollowServiceService
  ) { }

  ngOnChanges(): void{
    this.playlistsService.getPlaylistById(this.id).subscribe(data => this.playlistInfo = data);
    this.tracksService.getTotalSongsNumber(this.id).subscribe(data => this.total = data);
    this.followService.getCurrentUserId().subscribe(user => {
      this.followService.checkIfPlaylistFollowed(this.id, user.id).subscribe(boolArray => {
        this.followed = boolArray;
      });
    });
  }
  followPlaylist(id: string): void{
    this.followService.followPlaylist(id).subscribe((bool) => {
      this.followed[0] = true;
    });
  }
  unfollowPlaylist(id: string): void{
    this.followService.unfollowPlaylist(id).subscribe((bool) => {
      this.followed[0] = false;
    });
  }

}
