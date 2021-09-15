import { Compiler, Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

/**
 * @export class AuthGuard
 *
 * fillter router
 *
 * author: ITSG - HoanNNC
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.tokenStorageService.getToken();

    const expectedRole = route.children[0].data.expectedRole;

    // check rule router
    if (currentUser) {
      // logged in so return true
      const userInfo: any = this.tokenStorageService.getUser();

      // page not need rule to access
      if (!expectedRole) {
        return true;
      }

      let isValidRole = false;

      // fillter role
      for (const role of userInfo.roles) {
        if (role === expectedRole) {
          isValidRole = true;
        }
      }

      if (!isValidRole) {
        this.router.navigate(['norule']);
      }
      return isValidRole;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
