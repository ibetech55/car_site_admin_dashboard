import { Component } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { makeActions } from '../../../Store/Make/make.action';
import { makeSelector } from '../../../Store/Make/make.selector';
import {
  IGetMakePagination,
  IMakeFilterForm,
} from '../../../Data/Brand/Makes/GetMakes';
import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { HandleSQLDate } from '../../../../utils/HandleSQLDate';
import { ISortField } from '../../../Data/IPagination';
import { TableLazyLoadEvent } from 'primeng/table';
import { HandleQuery } from '../../../../utils/HandleQuery';
interface IIdsData {
  id: string;
  makeName: string;
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
    private _handleQuery: HandleQuery
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
    const query = this._handleQuery.execute(
      this.filterData,
      event
    )
    this._store.dispatch(
      makeActions.loadMakes({
        filter: {
          ...query
        },
      })
    );
    this.brandsData$ = this._store.select(makeSelector.makesData);
  }

  resetFilters(){
    this.filterData = {};
    this.getMakes()
  }

  ngOnInit() {
    this.getMakes();
  }

  ngOnDestroy() {
    this.verifyMakesResponseSub?.unsubscribe();
    this.selectAllSub.unsubscribe();
  }
}
