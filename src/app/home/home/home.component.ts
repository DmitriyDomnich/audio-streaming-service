import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements DoCheck, OnInit {

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }
    // was onInit()
  ngOnInit(){
    // localStorage.removeItem('token');
  }
  ngDoCheck(): void{ // || this.tokenService.checkToken()
    if (!localStorage.getItem('token') || localStorage.getItem('token') === 'undefined'){
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
