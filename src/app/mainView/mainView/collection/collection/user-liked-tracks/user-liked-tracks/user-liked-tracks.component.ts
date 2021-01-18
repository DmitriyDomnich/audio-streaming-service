import { HttpClient } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TracksService } from 'src/app/shared/models/services/tracks.service';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-user-liked-tracks',
  templateUrl: './user-liked-tracks.component.html',
  styleUrls: ['./user-liked-tracks.component.scss']
})
export class UserLikedTracksComponent implements OnInit {
  tracks: Track[] = [];

  dataSource = new MatTableDataSource(this.tracks);
  constructor(
    private tracksService: TracksService
  ) { }

  ngOnInit(): void{
    this.tracksService.getLikedTracks().subscribe(data => {
      this.tracks = data;
    });
  }
}
