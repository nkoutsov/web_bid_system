import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('admin')=='true') {
      // logged in so return true
      return true;
    }
    this.router.navigate(['/auctions'], { queryParams: { returnUrl: state.url } });
    return false;

  }
}
