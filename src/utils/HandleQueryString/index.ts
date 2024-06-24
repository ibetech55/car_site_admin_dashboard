import { Injectable } from '@angular/core';
import { IPagination } from '../../app/Data/IPagination';

@Injectable({
  providedIn: 'root',
})
export class HandleQueryString {
  execute<T, P>(filters: IPagination<T, P>): string {
    let queryString = '?';
    const obj: IPagination<T, P> = { ...filters };

    let hasObj = 0;

    Object.keys(obj).map((x) => {
      const key = x as keyof IPagination<T, P>;
      if (obj[key] && key !== 'where' && key !== 'orderBy') {
        queryString += `${key}=${obj[key]}&`;
        hasObj += 1;
      } else if (key === 'where' && obj.where) {
        Object.keys(obj.where).map((xw) => {
          const keyWhere = xw as keyof T;
          if (obj.where) {
            queryString += `${keyWhere as T}=${obj.where[keyWhere]}&`;
            hasObj += 1;
          }
        });
      } else if (key === 'orderBy') {
        if (obj.orderBy) {
          Object.keys(obj.orderBy).map((xo) => {
            const keyOrderBy = xo as keyof P;
            if (obj.orderBy) {
              queryString += `orderBy[${keyOrderBy as T}]=${
                obj.orderBy[keyOrderBy]
              }&`;
              hasObj += 1;
            }
          });
        }
      }
    });

    if (hasObj < 1) {
      queryString = '';
    } else {
      queryString = queryString.slice(0, -1);
    }

    return queryString;
  }
}
