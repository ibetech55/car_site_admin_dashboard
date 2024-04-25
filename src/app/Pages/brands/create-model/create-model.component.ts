import { Component } from '@angular/core';
import { IAppState } from '../../../Store/app.state';
import { Store } from '@ngrx/store';
import { makeActions } from '../../../Store/Make/make.action';
import { makeSelector } from '../../../Store/Make/make.selector';
import { Observable } from 'rxjs';
import { IGetMakesList } from '../../../Data/Brand/Makes/GetMakes';
interface Make {
  name: string;
  code: string;
}
@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrl: './create-model.component.scss',
})
export class CreateModelComponent {
  constructor(private _store: Store<IAppState>) {}

  selectedMake!: Make | undefined;
  makes: Make[] | undefined = [];

  ngOnInit() {
    this._store.dispatch(makeActions.getMakesList());
    this._store.select(makeSelector.makeList).subscribe((data) => {
    this.makes =  data.map((x: IGetMakesList) => {
      return { name: x.makeName, code: x.id }
    });
    });
  }
}
