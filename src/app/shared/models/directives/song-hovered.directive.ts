import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSongHovered]'
})
export class SongHoveredDirective {

  constructor(
    private element: ElementRef,
  ) { }
  @HostListener('mouseenter') onHover(): boolean{
    console.log('hovered');
    return true;
  }
}
