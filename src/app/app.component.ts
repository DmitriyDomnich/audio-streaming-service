import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, AfterViewInit, AfterContentChecked, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';
// import { createPlayer } from 'src/assets/scripts/player.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    title = 'Musify';
    token = localStorage.getItem('token');

    constructor(
        private tokenService: TokenService,
        private http: HttpClient,
        private router: Router
    ) {
      
    }
    ngOnInit(): void{

      // playerCreator.createPlayer();
    }

}
