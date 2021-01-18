import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, AfterViewInit, AfterContentChecked, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
    title = 'Musify';
    token = localStorage.getItem('token');

    constructor(
        private tokenService: TokenService,
        private http: HttpClient,
        private router: Router
    ) {
    }

}
