import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class HandleSQLDate {
  execute(dateString: string) {
    const date = DateTime.fromISO(dateString);
    return date.toFormat('yyyy-MM-dd');
  }
}
