import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'active',
})
export class ActivePipe implements PipeTransform {

  transform(value: boolean): 'Active' | 'In Active' {
    return value ? 'Active' : 'In Active';
  }

}
