import { Component } from '@angular/core';

@Component({
  selector: 'app-model-categories',
  templateUrl: './model-categories.component.html',
  styleUrl: './model-categories.component.scss'
})
export class ModelCategoriesComponent {
  categoryData = [{categoryName:'Minivan', active:'Active', createdAt:'12/12/2023', updatedAt: '-'}]
}
