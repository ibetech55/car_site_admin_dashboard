import { Component } from '@angular/core';

@Component({
  selector: 'app-create-multiple-models',
  templateUrl: './create-multiple-models.component.html',
  styleUrl: './create-multiple-models.component.scss'
})
export class CreateMultipleModelsComponent {
  fileName!: string;
  onFileChange(file: File) {
    this.fileName = file.name;
  }

  clearForm(){
    this.fileName = ''
  }
}
