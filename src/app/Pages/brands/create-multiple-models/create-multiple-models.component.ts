import { Component } from '@angular/core';
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
