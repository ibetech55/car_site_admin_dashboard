import { Component, Input } from '@angular/core';
import { IModelFilterForm } from '../../../../../Data/Brand/Model/GetModel';
import { ISelect } from '../../../../../Data/Common';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../../Store/app.state';
import { makeActions } from '../../../../../Store/Make/make.action';
import { makeSelector } from '../../../../../Store/Make/make.selector';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-view-models-filters',
  templateUrl: './view-models-filters.component.html',
  styleUrl: './view-models-filters.component.scss',
})
export class ViewModelsFiltersComponent {
  /**
   *
   */
  constructor(private _store: Store<IAppState>) {}
  @Input() filterData!: IModelFilterForm;
  @Input() handleFilter!: () => void;
  @Input() resetFilters!: () => void;
  makeList$: Observable<ISelect[]> = new Observable<ISelect[]>();

  statusOptions: ISelect[] = [
    { name: 'Active', code: true },
    { name: 'Inactive', code: false },
  ];

  getMakes() {
    this._store.dispatch(makeActions.getMakesList());
    this.makeList$ = this._store.select(makeSelector.makeList).pipe(
      map((data) => {
        return data.map((x) => ({
          name: x.makeName,
          code: x.makeName,
        }));
      })
    );
  }

  ngOnInit(){
    this.getMakes()
  }
}
