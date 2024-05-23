import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IGetMakePagination } from '../../../../../Data/Brand/Makes/GetMakes';
import { makeActions } from '../../../../../Store/Make/make.action';
import { makeSelector } from '../../../../../Store/Make/make.selector';
import { IAppState } from '../../../../../Store/app.state';

interface IIdsData {
  id: String;
  makeName: string;
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
}
