import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

    constructor(
        private tokenService: TokenService
    ) {  }

    getLoginUrl(): void{
        setTimeout(() => this.tokenService.getLoginUrl());
    }
}
