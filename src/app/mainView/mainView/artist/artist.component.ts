import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnChanges {
  id = '';
  subscription: Subscription;
  constructor(
    private acticatedRoute: ActivatedRoute
  ){
    const id = 'id';
    this.id = '';
    this.subscription = acticatedRoute.params.subscribe(params => this.id = params[id]);
   }

  ngOnChanges(): void{

  }

}
