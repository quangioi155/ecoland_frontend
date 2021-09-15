import { Component, Injectable, Input, OnChanges, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { MessageValidate } from "../message-validation";

/**
 * @export class ShowMessageComponent
 *
 * author: thaotv-its
 */
@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-show-message',
    template: ``,
    styles: [],
    providers: [MessageService],
})
export class ShowMessageComponent implements OnInit {

    constructor(
        private messageService: MessageService
    ) { }
    ngOnInit() {

    }
    showErrorMessage() {
        this.messageService.add({
            severity: 'error',
            detail: MessageValidate.MES_7,
        });
    }

    showSuccessMessage() {
        this.messageService.add({
            severity: 'success',
            detail: MessageValidate.MES_8,
        });
    }
}