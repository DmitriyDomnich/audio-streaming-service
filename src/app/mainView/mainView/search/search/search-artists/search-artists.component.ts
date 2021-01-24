import { Component, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/shared/models/artist';

@Component({
  selector: 'app-search-artists',
  templateUrl: './search-artists.component.html',
  styleUrls: ['./search-artists.component.css']
})
export class SearchArtistsComponent implements OnInit {
  @Input() artists: Artist[] = [];
  constructor() { }

  ngOnInit() {
  }

}
