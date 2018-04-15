import { Directive, ElementRef, HostListener } from '@angular/core';
import { constantValues } from '../../constants/constants';
@Directive({
  selector: 'img[appDefaultPoster]'
})
export class DefaultPosterDirective {
  constructor(private el: ElementRef) {  }
  /**
   * Invoked if there is error loading image source and sets default image
   */
  @HostListener('error') onerror() {
    this.el.nativeElement.src = constantValues.values.defaultPosterImage;
  }
}
