import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetModelByMakeId } from '../../../../../Data/Brand/Model/GetModel';
import { IGetMake } from '../../../../../Data/Brand/Makes/GetMakes';

@Component({
  selector: 'app-make-details-info',
  templateUrl: './make-details-info.component.html',
  styleUrl: './make-details-info.component.scss',
})
export class MakeDetailsInfoComponent {
  @Input() makeData$!: Observable<IGetMake>;
  @Input() openEditModal!: () => void;
}
