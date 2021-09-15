import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * @export class DateCommonComponent
 *
 * common check box
 *
 * author: thaotv-its
 */
@Component({
    selector: 'app-date-common',
    templateUrl: './date-common.component.html',
    styleUrls: ['./date-common.component.scss']
})
export class DateCommonComponent implements OnInit {

    /* label dropdown field */
    @Input() label: string;

    /* form control name */
    @Input() formName: string;

    /* form group */
    @Input() form: FormGroup;

    constructor() { }

    ngOnInit(): void { 
    }
}
