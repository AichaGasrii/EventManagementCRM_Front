import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../User/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizerGuard implements CanActivate {
  constructor(private login:AuthServiceService){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.login.isLoggedIn() && this.login.getMember().role == 'Organiser'){
        return true;
      }else{
        return false;
     }  
  }
  
}
