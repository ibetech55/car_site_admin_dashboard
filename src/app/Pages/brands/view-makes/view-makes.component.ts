import { Component } from '@angular/core';
import { Observable, Subscription, delay, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { makeActions } from '../../../Store/Make/make.action';
import { makeSelector } from '../../../Store/Make/make.selector';
import {
  IGetMake,
  IGetMakePagination,
  IMakeFilterForm,
  IMakeOrderBy,
  IMakesFilter,
} from '../../../Data/Brand/Makes/GetMakes';
import { ActivePipe } from '../../../shared/pipes/active.pipe/active.pipe';
import { FormatDatePipe } from '../../../shared/pipes/format.date/format.date.pipe';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { HandleSQLDate } from '../../../../utils/HandleSQLDate';
import { IPagination, ISortField } from '../../../Data/IPagination';
import { TableLazyLoadEvent } from 'primeng/table';
interface IIdsData {
  id: String;
  makeName: string;
}

interface IMap {
  [key: string]: string | undefined;
}

@Component({
  selector: 'app-view-makes',
  templateUrl: './view-makes.component.html',
  styleUrl: './view-makes.component.scss',
  providers: [MessageService, ConfirmationService, HandleSQLDate],
})
export class ViewMakesComponent {
  constructor(
    private _store: Store<IAppState>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _handleSQLDate: HandleSQLDate
  ) {}
  idsData: IIdsData[] = [];

  brandsData$!: Observable<IGetMakePagination>;
  loading: boolean = false;
  checked: boolean = false;
  verifyMakesResponseSub!: Subscription;
  textSelectAll = true;
  selectAllSub = new Subscription();
  filterData: IMakeFilterForm = {};
  sortFields: ISortField[] = [];

  openStatusDialog(event: Event, requestType: string) {
    if (this.idsData.length > 0) {
      this.loading = true;
      const makeNames = this.idsData.map((x) => x.makeName);
      const ids: string[] = this.idsData.map((x) => x.id) as string[];

      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Are you sure u want to active the following makes ${makeNames}`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          this._store.dispatch(makeActions.verifyMakes({ ids, requestType }));
          this.verifyMakesResponseSub = this._store
            .select(makeSelector.verifyMakesResponse)
            .subscribe((x) => {
              if (x) {
                this.messageService.add({
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'You have accepted',
                });
                this.idsData = [];
                this.textSelectAll = true;
                this._store.dispatch(makeActions.loadMakes({}));
                this.loading = false;
                this.selectAllSub.unsubscribe();
                this.verifyMakesResponseSub.unsubscribe();
              }
            });
        },
        reject: () => {
          this.loading = false;
        },
      });
    }
  }

  selectAll() {
    if (this.textSelectAll) {
      this.selectAllSub = this.brandsData$
        .pipe(
          map((data) =>
            data.data.map((x) => ({ id: x.id, makeName: x.makeName }))
          )
        )
        .subscribe((data2) => {
          this.idsData = [...data2];
          this.textSelectAll = false;
        });
    } else {
      this.idsData = [];
      this.textSelectAll = true;
    }
  }

  getMakes(event?: TableLazyLoadEvent) {
    console.log(event);
    let skip: number = 0;
    let page = 0;
    let rows: number = 0;
    let order = '';
    let orderBy = '';

    if (event) {
      skip = event?.first as number;
      rows = event?.rows as number;
      page = skip / rows + 1;

      if (event.sortField && event.sortOrder) {
        if (!this.sortFields.some((x) => x.field === event.sortField)) {
          this.sortFields.push({
            field: event.sortField as string,
            order: event.sortOrder === 1 ? 'asc' : 'desc',
          });
        } else {
          const index = this.sortFields.findIndex(
            (x) => x.field === event.sortField
          );
          this.sortFields[index].order =
            this.sortFields[index].order === 'asc' ? 'desc' : 'asc';
        }
      }
    }

    const filterData: { where: IMakesFilter; orderBy: IMap } = {
      where: {},
      orderBy: {},
    };
    this.sortFields.map((x) => {
      if (filterData.orderBy) {
        filterData.orderBy[x.field] = x.order;
      }
    });

    if (this.filterData.makeName && filterData.where) {
      filterData.where.makeName = this.filterData.makeName;
    }

    if (this.filterData.origin && filterData.where) {
      filterData.where.origin = this.filterData.origin;
    }

    if (this.filterData.startDate && filterData.where) {
      filterData.where.startDate = this._handleSQLDate.execute(
        this.filterData.startDate.toISOString()
      );
    }

    if (this.filterData.endDate && filterData.where) {
      filterData.where.endDate = this._handleSQLDate.execute(
        this.filterData.endDate.toISOString()
      );
    }
    this._store.dispatch(
      makeActions.loadMakes({
        filter: {
          page: page ? page : 1,
          limit: rows ? rows : 20,
          ...filterData,
        },
      })
    );
    this.brandsData$ = this._store.select(makeSelector.makesData);
  }

  ngOnInit() {
    this.getMakes();
  }

  ngOnDestroy() {
    this.verifyMakesResponseSub?.unsubscribe();
    this.selectAllSub.unsubscribe();
  }
}
