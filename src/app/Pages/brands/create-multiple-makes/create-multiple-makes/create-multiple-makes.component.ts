import { Component } from '@angular/core';

@Component({
  selector: 'app-create-multiple-makes',
  templateUrl: './create-multiple-makes.component.html',
  styleUrl: './create-multiple-makes.component.scss',
})
export class CreateMultipleMakesComponent {
  fileName!: string;
  onFileChange(file: File) {
    this.fileName = file.name;
  }

  clearForm(){
    this.fileName = ''
  }
}
