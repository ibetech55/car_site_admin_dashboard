import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { IGetMakePagination } from '../../../../../Data/Brand/Makes/GetMakes';
import { makeActions } from '../../../../../Store/Make/make.action';
import { makeSelector } from '../../../../../Store/Make/make.selector';
import { IAppState } from '../../../../../Store/app.state';
import { TableLazyLoadEvent, TablePageEvent } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

interface IIdsData {
  id: String;
  makeName: string;
}
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-view-makes-table',
  templateUrl: './view-makes-table.component.html',
  styleUrl: './view-makes-table.component.scss',
})
export class ViewMakesTableComponent {
  @Input() idsData: IIdsData[] = [];
  @Input() openStatusDialog!: (event: Event, requestType: string) => void;
  @Input() brandsData$!: Observable<IGetMakePagination>;
  @Input() selectAll!: () => void;
  @Input() textSelectAll!: boolean;
  @Input() getMakes!: (event:TableLazyLoadEvent) => void;
  first: number = 0;

  rows: number = 20;
  handleCheckbox(data: IIdsData) {
    if (!this.idsData.some((item) => item.id === data.id)) {
      this.idsData.push(data);
    } else {
      const index = this.idsData.findIndex((item) => item.id === data.id);
      this.idsData.splice(index, 1);
    }
  }

  checkId(id: string) {
    return this.idsData.some((item) => item.id === id);
  }

  onPageChange(ev:PaginatorState) {
  }
}
