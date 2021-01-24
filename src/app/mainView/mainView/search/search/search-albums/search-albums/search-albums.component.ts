import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';

@Component({
  selector: 'app-search-albums',
  templateUrl: './search-albums.component.html',
  styleUrls: ['./search-albums.component.css']
})
export class SearchAlbumsComponent implements OnInit {
  @Input() albums: Album[] = [];
  constructor() { }

  ngOnInit(): void{
  }

}
