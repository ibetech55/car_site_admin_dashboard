import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../Store/app.state';
import { makeActions } from '../../../../Store/Make/make.action';
import { makeSelector } from '../../../../Store/Make/make.selector';
import {
  IGetMakePagination,
} from '../../../../Data/Brand/Makes/GetMakes';
import { ActivePipe } from '../../../../shared/pipes/active.pipe/active.pipe';
import { FormatDatePipe } from '../../../../shared/pipes/format.date/format.date.pipe';

@Component({
  selector: 'app-view-makes',
  templateUrl: './view-makes.component.html',
  styleUrl: './view-makes.component.scss',
  providers: [ActivePipe, FormatDatePipe],
})
export class ViewMakesComponent {

  constructor(
    private _store: Store<IAppState>,
  ) {}

  brandsData$!: Observable<IGetMakePagination>;
  loading$!: Observable<boolean>;

  deleteMake(id: string) {
    alert(id);
  }
  ngOnInit() {
    this._store.dispatch(makeActions.loadMakes());
    this.brandsData$ = this._store.select(makeSelector.makesData);
    this.loading$ = this._store.select(makeSelector.loading);
  }
}
