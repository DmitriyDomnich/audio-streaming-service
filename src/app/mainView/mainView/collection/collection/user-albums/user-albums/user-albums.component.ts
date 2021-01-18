import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';
import { AlbumsService } from 'src/app/shared/models/services/albums.service';

@Component({
  selector: 'app-user-albums',
  templateUrl: './user-albums.component.html',
  styleUrls: ['./user-albums.component.scss']
})
export class UserAlbumsComponent implements OnInit {
  albums: Album[] = [];
  constructor(
    private albumsService: AlbumsService
  ) { }

  ngOnInit(): void{
    this.albumsService.getUserAlbums().subscribe(data => {
      this.albums = data;
      console.log(this.albums);
    });
  }
  getArtistNames(artists: any): string[] {
    return artists.map((artist: any) => {
      return artist.name;
    });
  }
}
