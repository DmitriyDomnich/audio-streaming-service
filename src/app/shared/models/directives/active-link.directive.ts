import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appActiveLink]'
})
export class ActiveLinkDirective {

  constructor(
    private el: ElementRef
  ) {
    el.nativeElement.style.color = 'primary';
  }

}
