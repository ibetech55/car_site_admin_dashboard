import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../Store/app.state';
import { makeActions } from '../../../../Store/Make/make.action';
import { Observable } from 'rxjs';
import { IGetMake } from '../../../../Data/Brand/Makes/GetMakes';
import { makeSelector } from '../../../../Store/Make/make.selector';
import { modelActions } from '../../../../Store/Model/model.action';
import { IGetModelByMakeId } from '../../../../Data/Brand/Model/GetModel';
import { modelSelector } from '../../../../Store/Model/model.selector';

@Component({
  selector: 'app-make-details',
  templateUrl: './make-details.component.html',
  styleUrl: './make-details.component.scss',
})
export class MakeDetailsComponent {
  constructor(
    private _router: ActivatedRoute,
    private _store: Store<IAppState>
  ) {}
  id: string = this._router.snapshot.params['id'];
  makeData$!: Observable<IGetMake>;
  modelData$!: Observable<IGetModelByMakeId[]>;
  editDialog: boolean = false;
  @Output() visibilityChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  openEditModal(){
    this.editDialog = true;
  }

  closeEditModal(){
    this.editDialog = false;
    this.visibilityChange.emit(this.editDialog);
  }

  ngOnInit() {
    this._store.dispatch(makeActions.getMakeById({ id: this.id }));
    this.makeData$ = this._store.select(makeSelector.makeData);
    this._store.dispatch(modelActions.getModelByMakeId({ makeId: this.id }));
    this.modelData$ = this._store.select(modelSelector.modelByMakeData)
  }
}
