import { Component, OnInit } from '@angular/core';
import { InforUserLogin } from '../dto/inforHeaderUserLogin';
import { HeaderService } from '../service/header.service';
import { TokenStorageService } from '../service/token-storage.service';

/**
 * @export class HeaderComponent
 *
 * common header
 *
 * author: ITSG - HoanNNC
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /* flag logged in */
  isLoggedIn: boolean;

  inforUserLogin: InforUserLogin = new InforUserLogin();

  constructor(private tokenStorageService: TokenStorageService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.getInfoUserLogin();
    }
  }
  getInfoUserLogin() {
    this.headerService.getInforUserLogin().subscribe((result) => {
      this.inforUserLogin = result.item;
    });
  }
  logout() {
    this.tokenStorageService.signOut(this.tokenStorageService.getToken());
  }
}
