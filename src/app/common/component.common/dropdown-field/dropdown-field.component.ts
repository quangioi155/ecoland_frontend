import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * @export class DropdownFieldComponent
 *
 * common dropdown
 *
 * author: ITSG-HoanNNC
 */
@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss']
})
export class DropdownFieldComponent implements OnInit {

  /* label dropdown field */
  @Input() label: string;

  /* form control name */
  @Input() formName: string;

  /* form placeholder */
  @Input() placeholder: string;

  /* form group */
  @Input() form: FormGroup;

  /**
   * data dropdown 
   * 
   * @input array<{name: any, value: any}> 
   * name: display label of dropdown item
   * value: contain the value of item
   * */
  @Input() data: any[];

  constructor() { }
 
  ngOnInit(): void {
  }

}
