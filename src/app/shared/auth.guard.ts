import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private localStorage: LocalstorageService,
    private router: Router) { }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.localStorage.get('token')) {
      // if(this.localStorage.get('type')==='admin'){
      // return this.router.createUrlTree(['login/admin'])}
      // else if(!this.localStorage.get('token') && this.localStorage.get('type')==='member'){
      //   return this.router.createUrlTree(['login/member'])
      // }
      return true
      // return this.router.createUrlTree(['login'])
    }


    return true
  }

}
