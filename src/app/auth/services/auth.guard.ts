import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private commonService: CommonService
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.commonService.isOnline ? this.authservice.isUserLogedIn.pipe(
    //   take(1),
    //   map(res => res)
    // ) : true
    return !!JSON.parse(localStorage.getItem('creds')!) ? true : false
  }
  
}
