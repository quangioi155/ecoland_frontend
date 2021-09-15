import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * @export class AutocompleteFieldComponent
 *
 * common autocomplete
 *
 * author: HoanNNC-ITS
 */
@Component({
  selector: 'app-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.scss']
})
export class AutocompleteFieldComponent implements OnInit {
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

  filteredProductCategories: any[];
  constructor() { }

  ngOnInit(): void {

  }
  filterProductCategories(event) {
    let filtered: any[] = [];
    let query = event.query;
    this.data.map((item: any) => {
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    })
    this.filteredProductCategories = filtered;
  }

}
