import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringSeperator'
})
export class StringSeperatorPipe implements PipeTransform {

  transform(value:string): string {
    return value.split(',').join(', ');
  }

}
