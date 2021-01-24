import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';
import { Artist } from 'src/app/shared/models/artist';
import { HomeService } from 'src/app/shared/models/services/home.service';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss']
})
export class ShortcutsComponent implements OnInit {
  albumsShortcuts: Album[] = [];
  artistsShortcuts: Artist[] = [];
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void{
    this.homeService.getArtistsShortcuts().subscribe(data => {
      this.artistsShortcuts = data;
      console.log('ARTISTS SHORTCUTS');
      console.log(this.artistsShortcuts);
    });
    this.homeService.getAlbumsShortcuts().subscribe(data => {
      this.albumsShortcuts = data;
      console.log('ALBUMS SHORTCUTS');
      console.log(this.albumsShortcuts);
    });
  }

}
