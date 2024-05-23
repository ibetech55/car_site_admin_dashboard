import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultipleMakesFormComponent } from './create-multiple-makes-form';

describe('CreateMultipleMakesFormComponent', () => {
  let component: CreateMultipleMakesFormComponent;
  let fixture: ComponentFixture<CreateMultipleMakesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMultipleMakesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMultipleMakesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
