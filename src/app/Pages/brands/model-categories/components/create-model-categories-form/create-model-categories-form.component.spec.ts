import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModelCategoriesFormComponent } from './create-model-categories-form.component';

describe('CreateModelCategoriesFormComponent', () => {
  let component: CreateModelCategoriesFormComponent;
  let fixture: ComponentFixture<CreateModelCategoriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateModelCategoriesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateModelCategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
