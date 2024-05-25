import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date | null, ...args: unknown[]): unknown {
    if (value) {
      const date = DateTime.fromISO(value.toString());
      return date.toFormat('MM/dd/yyyy');
    }
    return '-';
  }
}
