import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCategoryDetailsPageComponent } from './model-category-details-page.component';

describe('ModelCategoryDetailsPageComponent', () => {
  let component: ModelCategoryDetailsPageComponent;
  let fixture: ComponentFixture<ModelCategoryDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelCategoryDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelCategoryDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
