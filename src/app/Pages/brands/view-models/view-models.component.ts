import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { IGetModelPagination } from '../../../Data/Brand/Model/GetModel';
import { Observable } from 'rxjs';
import { modelActions } from '../../../Store/Model/model.action';
import { modelSelector } from '../../../Store/Model/model.selector';

@Component({
  selector: 'app-view-models',
  templateUrl: './view-models.component.html',
  styleUrl: './view-models.component.scss'
})
export class ViewModelsComponent {
  constructor(
    private _store: Store<IAppState>,
  ) {}

  modelsData$!: Observable<IGetModelPagination>;

  deleteModel(id: string) {
    alert(id);
  }
  ngOnInit() {
    this._store.dispatch(modelActions.getModels());
    this.modelsData$ = this._store.select(modelSelector.modelsData);
  }
}
