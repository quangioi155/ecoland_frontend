import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * @export class CheckboxFieldComponent
 *
 * common check box
 *
 * author: thaotv-its
 */
@Component({
    selector: 'app-checkbox-field',
    templateUrl: './checkox-field.component.html',
    styleUrls: ['./chekbox-field.component.scss']
})
export class CheckboxFieldComponent implements OnInit {

    /* label dropdown field */
    @Input() label: string;

    /* form control name */
    @Input() ngModelCheck: boolean;

    /* form group */
    @Input() formName: string;

    @Input() value: string;

    /* form group */
    @Input() form: FormGroup;

    @Input() inputId: string;

    constructor() { }

    ngOnInit(): void {

    }
    onChangeData(event:any){
        this.ngModelCheck = event.checked;
    }
}
