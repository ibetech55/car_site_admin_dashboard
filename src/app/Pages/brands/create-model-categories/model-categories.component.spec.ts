import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCategoriesComponent } from './model-categories.component';

describe('ModelCategoriesComponent', () => {
  let component: ModelCategoriesComponent;
  let fixture: ComponentFixture<ModelCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
