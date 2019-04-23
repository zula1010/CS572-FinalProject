import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

/**
 * https://stackoverflow.com/questions/41148020/angular2-candeactivate-guard
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class SecureGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let token = this.loginService.getToken();
    if(!token){
      this.router.navigate(['/login']);
      return false;
    } 
    return true;
  }
}
