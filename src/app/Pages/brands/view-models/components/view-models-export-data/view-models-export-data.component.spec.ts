import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModelsExportDataComponent } from './view-models-export-data.component';

describe('ViewModelsExportDataComponent', () => {
  let component: ViewModelsExportDataComponent;
  let fixture: ComponentFixture<ViewModelsExportDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewModelsExportDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewModelsExportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
