import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultipleModelsComponent } from './create-multiple-models.component';

describe('CreateMultipleModelsComponent', () => {
  let component: CreateMultipleModelsComponent;
  let fixture: ComponentFixture<CreateMultipleModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMultipleModelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMultipleModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
