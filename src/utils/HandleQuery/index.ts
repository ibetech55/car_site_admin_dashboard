import { TableLazyLoadEvent } from 'primeng/table';
import { ISortField } from '../../app/Data/IPagination';
import { HandleSQLDate } from '../HandleSQLDate';
import { Injectable } from '@angular/core';
interface IMap {
  [key: string]: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class HandleQuery {
  constructor(private _handleSQLDate: HandleSQLDate) {}
  sortFields: ISortField[] = [];
  execute(params: { filter: any; event?: TableLazyLoadEvent, reset?:boolean }) {
    let skip: number = 0;
    let page = 0;
    let rows: number = 0;
    const { event, filter, reset } = params;
    if(reset) {
      this.sortFields = []
    }
    if (event) {
      skip = event?.first as number;
      rows = event?.rows as number;
      page = skip / rows + 1;

      if (event.sortField && event.sortOrder) {
        if (this.sortFields.some((x) => x.field === event.sortField)) {
          const index = this.sortFields.findIndex(
            (x) => x.field === event.sortField
          );
          this.sortFields.splice(index, 1);
        }

        this.sortFields.unshift({
          field: event.sortField as string,
          order: event.sortOrder === 1 ? 'asc' : 'desc',
        });
      }
    }

    const filterData: { where: IMap; orderBy: IMap } = {
      where: {},
      orderBy: {},
    };
    this.sortFields.map((x) => {
      if (filterData.orderBy) {
        filterData.orderBy[x.field] = x.order;
      }
    });

    Object.keys(filter).map((key) => {
      if (
        filter[key] &&
        filterData.where &&
        key !== 'startDate' &&
        key !== 'endDate'
      ) {
        filterData.where[key] = filter[key];
      } else {
        filterData.where[key] = this._handleSQLDate.execute(
          filter[key].toISOString()
        );
      }
    });
    return {
      page: page ? page : 1,
      limit: rows ? rows : 20,
      ...filterData,
    };
  }
}
