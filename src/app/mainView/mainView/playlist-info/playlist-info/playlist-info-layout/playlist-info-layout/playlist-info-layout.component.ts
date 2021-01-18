import { AfterContentChecked, AfterViewChecked, Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { Playlist } from 'src/app/shared/models/playlist';
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
  constructor(
    private playlistsService: PlaylistsService,
    private tracksService: TracksService
  ) { }

  ngOnChanges(): void{
    this.playlistsService.getPlaylistById(this.id).subscribe(data => this.playlistInfo = data);
    this.tracksService.getTotalSongsNumber(this.id).subscribe(data => this.total = data);
  }

}
