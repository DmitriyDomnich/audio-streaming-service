import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/shared/models/playlist';
import { HomeService } from 'src/app/shared/models/services/home.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  playlists: Playlist[] = [];
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void{
    this.homeService.getFeaturedPlaylists().subscribe(data => {
      this.playlists = data;
      console.log('FEATURED');
      console.log(this.playlists);
    })
  }

}
