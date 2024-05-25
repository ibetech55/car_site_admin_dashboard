import { Component } from '@angular/core';
import { Observable, Subscription, delay } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { makeActions } from '../../../Store/Make/make.action';
import { makeSelector } from '../../../Store/Make/make.selector';
import {
  IGetMake,
  IGetMakePagination,
} from '../../../Data/Brand/Makes/GetMakes';
import { ActivePipe } from '../../../shared/pipes/active.pipe/active.pipe';
import { FormatDatePipe } from '../../../shared/pipes/format.date/format.date.pipe';
import { ConfirmationService, MessageService } from 'primeng/api';
interface IIdsData {
  id: String;
  makeName: string;
}

@Component({
  selector: 'app-view-makes',
  templateUrl: './view-makes.component.html',
  styleUrl: './view-makes.component.scss',
  providers:[MessageService, ConfirmationService]
})
export class ViewMakesComponent {
  constructor(
    private _store: Store<IAppState>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  idsData: IIdsData[] = [];

  brandsData$!: Observable<IGetMakePagination>;
  loading: boolean = false;
  checked: boolean = false;
  verifyMakesResponseSub!: Subscription;

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
                this._store.dispatch(makeActions.loadMakes());
                this.loading = false;
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

  ngOnInit() {
    this._store.dispatch(makeActions.loadMakes());
    this.brandsData$ = this._store.select(makeSelector.makesData);
  }

  ngOnDestroy() {
    this.verifyMakesResponseSub?.unsubscribe();
  }
}