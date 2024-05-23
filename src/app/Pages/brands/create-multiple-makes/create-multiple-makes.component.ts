import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { makeActions } from '../../../Store/Make/make.action';
import { makeSelector } from '../../../Store/Make/make.selector';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CONSTANTS } from '../../../Constants';

@Component({
  selector: 'app-create-multiple-makes',
  templateUrl: './create-multiple-makes.component.html',
  styleUrl: './create-multiple-makes.component.scss',
  providers: [MessageService],
})
export class CreateMultipleMakesComponent {
  loading = false;
  onLoadingChange(newLoadingState: boolean) {
    this.loading = newLoadingState;
  }
}
