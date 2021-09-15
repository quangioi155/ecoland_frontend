import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { ConstantsCommon } from '../common/constants.common';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

/**
 * @export class TokenStorageService
 *
 * token storage service
 *
 * author: ITSG - ThaoTV
 */
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private authService: AuthService,private router: Router) { }

  signOut(token: string) {
    this.authService.logout(token).pipe(delay(500)).subscribe(
      data => {
        window.sessionStorage.clear();
        this.router.navigate(['/login'])
      },
      err => {
        debugger
      }
    );
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public saveCacheSearch(screen: string, cache: any) {
    window.sessionStorage.setItem(screen, JSON.stringify(cache));
  }

  public getCacheSearch(screen: string) {
    return JSON.parse(sessionStorage.getItem(screen));
  }

  public clearCacheSearch(screen: string) {
    window.sessionStorage.removeItem(screen);
  }
}