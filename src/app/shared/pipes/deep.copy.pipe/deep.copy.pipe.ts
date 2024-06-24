import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deepCopy'
})
export class DeepCopyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): any {
      return JSON.parse(JSON.stringify(value, null, 2)); 
  }
}
