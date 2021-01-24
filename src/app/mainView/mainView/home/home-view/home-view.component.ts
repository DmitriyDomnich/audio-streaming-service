import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';
import { HomeService } from 'src/app/shared/models/services/home.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void{
  }

}
