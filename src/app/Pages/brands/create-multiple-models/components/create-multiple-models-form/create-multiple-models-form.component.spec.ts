import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultipleModelsFormComponent } from './create-multiple-models-form.component';

describe('CreateMultipleModelsFormComponent', () => {
  let component: CreateMultipleModelsFormComponent;
  let fixture: ComponentFixture<CreateMultipleModelsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMultipleModelsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMultipleModelsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
