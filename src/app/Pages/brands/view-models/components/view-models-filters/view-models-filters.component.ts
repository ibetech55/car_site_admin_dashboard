import { Component, Input } from '@angular/core';
import { IModelFilterForm } from '../../../../../Data/Brand/Model/GetModel';
import { ISelect } from '../../../../../Data/Common';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../../Store/app.state';
import { makeActions } from '../../../../../Store/Make/make.action';
import { makeSelector } from '../../../../../Store/Make/make.selector';
import { Observable, map } from 'rxjs';
import { modelCategoryActions } from '../../../../../Store/ModelCategory/model.category.action';
import { modelCategorySelector } from '../../../../../Store/ModelCategory/model.category.selector';

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
  @Input() handleRemoveBodyType!: (bodyTypeIndex: number) => void;
  @Input() handleBodyType!: (value: any) => void;
  @Input() bodyTypeText!: {text:string};
  makeList$: Observable<ISelect[]> = new Observable<ISelect[]>();
  modelCategories$ = new Observable<ISelect[]>();

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

  getModelCategories() {
    this._store.dispatch(modelCategoryActions.getModelCategoryList());
    this.modelCategories$ = this._store
      .select(modelCategorySelector.modelCategoryListData)
      .pipe(
        map((data) =>
          data.map((x) => ({
            name: x.type,
            code: x.id,
          }))
        )
      );
  }

  ngOnInit() {
    this.getMakes();
    this.getModelCategories();
  }
}
