import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';
import { HomeService } from 'src/app/shared/models/services/home.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.scss']
})
export class NewReleasesComponent implements OnInit {
  albums: Album[] = [];
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void{
    this.homeService.getNewReleases().subscribe(data => {
      this.albums = data;
      console.log('NEW RELEASES ALBUMS');
      console.log(this.albums);
    });
  }

}
