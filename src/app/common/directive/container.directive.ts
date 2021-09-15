import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appContainer]',
})
export class ContainerDirective {
    constructor(el: ElementRef) {
      el.nativeElement.style.padding = "0px 10px 5px 15px";
    }
}
