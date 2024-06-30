import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModelsFiltersComponent } from './view-models-filters.component';

describe('ViewModelsFiltersComponent', () => {
  let component: ViewModelsFiltersComponent;
  let fixture: ComponentFixture<ViewModelsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewModelsFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewModelsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
