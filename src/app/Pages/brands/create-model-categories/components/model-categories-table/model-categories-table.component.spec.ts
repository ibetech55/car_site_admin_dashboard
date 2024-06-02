import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCategoriesTableComponent } from './model-categories-table.component';

describe('ModelCategoriesTableComponent', () => {
  let component: ModelCategoriesTableComponent;
  let fixture: ComponentFixture<ModelCategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelCategoriesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
