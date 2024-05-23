import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMakesTableComponent } from './view-makes-table.component';

describe('ViewMakesTableComponent', () => {
  let component: ViewMakesTableComponent;
  let fixture: ComponentFixture<ViewMakesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMakesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMakesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
