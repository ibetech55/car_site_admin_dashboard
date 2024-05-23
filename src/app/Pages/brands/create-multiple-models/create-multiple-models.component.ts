import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { modelActions } from '../../../Store/Model/model.action';
import { modelSelector } from '../../../Store/Model/model.selector';
import { Subscription } from 'rxjs';
import { IMultipleModelErrors } from '../../../Data/Brand/Model/CreateModel';
import { CONSTANTS } from '../../../Constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-multiple-models',
  templateUrl: './create-multiple-models.component.html',
  styleUrl: './create-multiple-models.component.scss',
  providers: [MessageService],
})
export class CreateMultipleModelsComponent {
  loading: boolean = false;
  onLoadingChange(newLoadingState: boolean) {
    this.loading = newLoadingState;
  }
}
