import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDetailsInfoComponent } from './model-details-info.component';

describe('ModelDetailsInfoComponent', () => {
  let component: ModelDetailsInfoComponent;
  let fixture: ComponentFixture<ModelDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelDetailsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
