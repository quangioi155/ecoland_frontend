import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * @export class TextboxFieldComponent
 *
 * common textbox field
 *
 * author: ITSG-HoanNNC
 */
@Component({
  selector: 'app-textbox-field',
  templateUrl: './textbox-field.component.html',
  styleUrls: ['./textbox-field.component.scss']
})
export class TextboxFieldComponent implements OnInit {

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
