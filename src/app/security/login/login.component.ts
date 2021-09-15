import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantsCommon, eRole } from 'src/app/common/constants.common';
import { LabelCommon } from 'src/app/common/label.common';
import { MessageValidate } from 'src/app/common/message-validation';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

/**
 * @export class LoginComponent
 *
 * login screen
 *
 * author: ITSG - HoanNNC
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    /* validation message */
    validation: MessageValidate = new MessageValidate();

    /* login label */
    labelLogin: LabelCommon = new LabelCommon();

    /* login form */
    loginForm = new FormGroup({});

    /* flag login status */
    isLoginFailed = false;

    /* flag submit */
    submitted = false;
    rules: string[] = [];
    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        });
    }
    get f() {
        return this.loginForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.isLoginFailed = true;
            return;
        }
        this.authService.login(this.loginForm).subscribe(
            (data) => {
                // login sucess
                if (data.token) {
                    this.tokenStorage.saveToken(data.token);
                    this.tokenStorage.saveUser(data);
                    this.rules = this.tokenStorage.getUser().roles;
                    this.isLoginFailed = false;
                    if (this.rules.indexOf(eRole.CONTACT_CUSTOMER_FLAG) >= 0) {
                        this.router.navigate(['/ecoland/search-project']);
                    } else if (this.rules.indexOf(eRole.ZEC_FLAG) >= 0) {
                        this.router.navigate(['/ecoland/zec']);
                    } else {
                        this.router.navigate(['/ecoland']);
                    }
                }
                // login id or password wrong
                else {
                    this.isLoginFailed = true;
                }

            },
            (err) => {
                this.isLoginFailed = true;
            }
        );
    }
}
