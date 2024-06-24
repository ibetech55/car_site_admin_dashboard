import { Component, Input } from '@angular/core';
import { IMakeFilterForm } from '../../../../../Data/Brand/Makes/GetMakes';

@Component({
  selector: 'app-view-makes-filters',
  templateUrl: './view-makes-filters.component.html',
  styleUrl: './view-makes-filters.component.scss',
})
export class ViewMakesFiltersComponent {
  @Input() filterData!: IMakeFilterForm;
  @Input() handleFilter!: () => void;
}
