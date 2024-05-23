import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultipleMakesComponent } from './create-multiple-makes.component';

describe('CreateMultipleMakesComponent', () => {
  let component: CreateMultipleMakesComponent;
  let fixture: ComponentFixture<CreateMultipleMakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMultipleMakesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMultipleMakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
