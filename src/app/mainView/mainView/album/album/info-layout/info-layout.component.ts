import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';
import { AlbumsService } from 'src/app/shared/models/services/albums.service';

@Component({
  selector: 'app-info-layout',
  templateUrl: './info-layout.component.html',
  styleUrls: ['./info-layout.component.scss']
})
export class InfoLayoutComponent implements OnInit {
  @Input() id = '';
  @Input() album: Album = {id: '', name: '', copyrights: ''};
  @Input() duration = 0;
  constructor(
    private albumsService: AlbumsService
  ) { }

  ngOnInit(): void{
  }

}
