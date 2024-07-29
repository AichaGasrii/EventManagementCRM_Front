import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {
  constructor(private router: Router, private login:AuthServiceService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.login.isLoggedIn() && this.login.getMember().role == 'Admin'){
        return true;
      }else{
        return false;
     }  
  }

}