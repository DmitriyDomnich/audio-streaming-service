import { AfterContentChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { Playlist } from '../../../shared/models/playlist';

import { Router } from '@angular/router';
import { PlaylistsService } from 'src/app/shared/models/services/playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements AfterViewInit{
  playlists: Playlist[] = [];

  constructor(
    private playlistsService: PlaylistsService
  ) { }


  ngAfterViewInit(): void{ // AfterViewInit вроде работает, onChanges - нет, doCheck - лагает,
    this.playlistsService.getUserPlaylists().subscribe((data) => this.playlists = data);

  }

}
