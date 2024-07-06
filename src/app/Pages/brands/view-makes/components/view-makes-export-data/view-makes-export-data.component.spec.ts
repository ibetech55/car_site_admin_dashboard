import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMakesExportDataComponent } from './view-makes-export-data.component';

describe('ViewMakesExportDataComponent', () => {
  let component: ViewMakesExportDataComponent;
  let fixture: ComponentFixture<ViewMakesExportDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMakesExportDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMakesExportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
