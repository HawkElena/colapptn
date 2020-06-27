// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService){}
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

//       return this.authService.isLoggedIn();

//   }
// }
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _route: Router) { }
  canActivate(): boolean {
    if (this._authService.isLoggedIn()) {
      return true;
    } else {
      this._route.navigate(['/login'])
      return false;
    }

  }
}
