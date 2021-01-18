import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate{
  constructor(
    private router: Router,
    private tokenService: TokenService
  ){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
      if (localStorage.getItem('token')
          && localStorage.getItem('token') !== 'undefined' || window.location.hash){ // !this.tokenService.checkToken()
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }
}
