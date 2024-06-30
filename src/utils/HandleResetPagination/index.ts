import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HandleResetPagination {
  constructor(
  ) {}
  execute(renderer: Renderer2, element: ElementRef<HTMLDivElement>, el: ElementRef) {
    let button: ElementRef;
    const menuOuterWrapper = element.nativeElement.querySelectorAll(
      '.p-paginator-pages.ng-star-inserted button'
    );
    const firstElement = menuOuterWrapper[0];
    renderer.addClass(firstElement, 'firstPagEl');
    button = el.nativeElement.querySelector('.firstPagEl');
    renderer.removeClass(firstElement, 'firstPagEl');

    renderer.selectRootElement(button).click();

    renderer.setProperty(firstElement, 'innerHTML', '1');
    renderer.setProperty(firstElement, 'innerText', '1');
  }
}
