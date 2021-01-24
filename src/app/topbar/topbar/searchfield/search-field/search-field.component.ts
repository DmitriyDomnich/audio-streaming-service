import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SearchService } from 'src/app/shared/models/services/search.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {

  // private searchTerms = new Subject<string>();
  delayTimer?: any;
  navigate(term: string): void{
    if (term === ''){
      this.router.navigate(['/']);
    }
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      if (term === ''){
        this.router.navigate(['/']);
      } else{
        this.router.navigate(['/search', term]);
      }
    }, 500);
  }
  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }
  // search(term: string): void{
  //   this.searchTerms.next(term);
  // }
  ngOnInit(): void{

  }

}
