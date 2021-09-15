import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCheckDuplicate]'
})
export class CheckDuplicateDirective {
  @Input() appCheckDuplicate: boolean = false;
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('focusout') onFocusOut() {
    // pending
    // if(this.appCheckDuplicate) {
    //   this.el.nativeElement.
    // }
  }
}
