import { Component, OnInit } from '@angular/core';
import { eMenu, eRole, eSystemMenu } from '../common/constants.common';
import { TokenStorageService } from '../service/token-storage.service';

/**
 * @export class HomeComponent
 *
 * header main screen
 *
 * author: ITSG - HoanNNC
 */
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    /* is login */
    isLoggedIn: boolean;
    
    /* is role when login */
    isReception: boolean;
    isDriver: boolean;
    isVehicleDispatch: boolean;
    isZec: boolean;
    isManager: boolean;
    isWareHouse: boolean;
    isSystemAdmin: boolean;
    /* end */

    /* main menu */
    menu = eMenu;

    /* system sub menu */
    systemMenu = eSystemMenu;

    rules: string[] = [];

    constructor(private tokenStorageService: TokenStorageService) {
        this.rules = this.tokenStorageService.getUser().roles;
    }

    ngOnInit() {
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
            this.isReception = this.rules.indexOf(eRole.CONTACT_CUSTOMER_FLAG) >= 0 ? true : false;
            this.isDriver = this.rules.indexOf(eRole.DRIVER_FLAG) >= 0 ? true : false;
            this.isVehicleDispatch = this.rules.indexOf(eRole.VEHICLE_DISPATCH_FLAG) >= 0 ? true : false;
            this.isZec = this.rules.indexOf(eRole.ZEC_FLAG) >= 0 ? true : false;
            this.isManager = this.rules.indexOf(eRole.MANAGE_FLAG) >= 0 ? true : false;
            this.isWareHouse = this.rules.indexOf(eRole.WAREHOUSE_FLAG) >= 0 ? true : false;
            this.isSystemAdmin = this.rules.indexOf(eRole.SYSTEM_FLAG) >= 0 ? true : false;
        }
    }

    logout() {
        this.tokenStorageService.signOut(this.tokenStorageService.getToken());
    }
}
