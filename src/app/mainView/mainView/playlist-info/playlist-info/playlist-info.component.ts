
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/shared/models/playlist';
import { PlaylistsService } from 'src/app/shared/models/services/playlists.service';
import { TracksService } from 'src/app/shared/models/services/tracks.service';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-playlist-info',
  templateUrl: './playlist-info.component.html',
  styleUrls: ['./playlist-info.component.scss'],
})
export class PlaylistInfoComponent implements OnChanges, OnInit {
  id: string;
  tracks: Track[] = [];
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tracksService: TracksService,
  ){
    const id = 'id';
    this.id = '';
    this.subscription = activatedRoute.params.subscribe(params => this.id = params[id]);
  }

  ngOnInit(): void{

  }
  ngOnChanges(): void{
    this.tracksService.getPlaylistTracks(this.id).subscribe(data => {
      this.tracks = data;
    });
  }
}
