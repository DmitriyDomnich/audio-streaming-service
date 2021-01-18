import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, AfterViewChecked, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentChecked {

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private router: Router
  ) { }
    // was onInit()
    // ngOnInit(){
    //   // localStorage.removeItem('token');
    // }

  ngOnInit(): void{
    if (this.tokenService.getRedirectRoute()){
      this.router.navigate([this.tokenService.getRedirectRoute()]);
      this.tokenService.setRedirectRoute();
    }
    if ((!localStorage.getItem('token') || localStorage.getItem('token') === 'undefined') && window.location.hash){
      this.tokenService.setAuthToken();
    }
    if (window.location.hash){
      window.location.hash = '';
    }
  }
  ngAfterContentChecked(): void{ // || this.tokenService.checkToken() ngDoCheck()
    if ((!localStorage.getItem('token') || localStorage.getItem('token') === 'undefined') && window.location.hash){
      this.tokenService.setAuthToken();
    }
    if (this.tokenService.checkToken()){
      this.tokenService.refreshToken();
    }

  }
  refresh(): void{
    this.tokenService.refreshToken();
  }
}
