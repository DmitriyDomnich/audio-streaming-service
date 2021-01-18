import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBackImage]',
})
export class BackImageDirective {
  @Input() src: any;
  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundImage = this.src;
  }
}
