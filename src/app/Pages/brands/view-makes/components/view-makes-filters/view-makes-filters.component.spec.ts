import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMakesFiltersComponent } from './view-makes-filters.component';

describe('ViewMakesFiltersComponent', () => {
  let component: ViewMakesFiltersComponent;
  let fixture: ComponentFixture<ViewMakesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMakesFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMakesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
