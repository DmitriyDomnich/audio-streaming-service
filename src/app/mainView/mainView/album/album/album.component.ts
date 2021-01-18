import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/shared/models/album';
import { AlbumsService } from 'src/app/shared/models/services/albums.service';
import { TracksService } from 'src/app/shared/models/services/tracks.service';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: Album = {id: '', name: '', copyrights: ''};
  tracks: Track[] = [];
  id = '';
  duration = 0;
  constructor(
    private route: ActivatedRoute,
    private albumsService: AlbumsService,
    private tracksService: TracksService
  ) {
    const idLit = 'id';
    this.id = route.snapshot.params[idLit];
  }

  ngOnInit(): void{
    this.albumsService.getAlbumById(this.id).subscribe(data => {
      this.album = data;
    });
    // this.tracksService.getAlbumTracks(this.id).subscribe(data => {
    //   this.tracks = data;
    //   console.log(this.tracks);
    // });
    // this.duration = this.getTotalTime();
  }
  getTotalTime(): any{
    let result = 0;
    this.tracksService.getAlbumTracks(this.id).subscribe(data => {
        this.tracks = data;
        this.tracks.forEach((track) => result += track.duration);
        return result;
    });
  }
}
