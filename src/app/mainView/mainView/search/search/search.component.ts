import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Search } from 'src/app/shared/models/search';
import { SearchService } from 'src/app/shared/models/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  searchItems: any;
  private subscription: Subscription;
  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute
  ) {
    const term = 'term';
    this.subscription = activatedRoute.params.subscribe(params => this.searchTerm = params[term]);
   }
  ngOnInit(): void{
    this.searchService.searchItems(this.searchTerm).subscribe((data: any) => {
      this.searchItems = data;
      console.log(this.searchItems);
    });
  }

}
