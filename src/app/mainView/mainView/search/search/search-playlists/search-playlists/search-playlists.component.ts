import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/shared/models/playlist';

@Component({
  selector: 'app-search-playlists',
  templateUrl: './search-playlists.component.html',
  styleUrls: ['./search-playlists.component.css']
})
export class SearchPlaylistsComponent implements OnInit {
  @Input() playlists: Playlist[] = [];
  constructor() { }

  ngOnInit(): void{
  }

}
