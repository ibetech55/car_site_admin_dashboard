import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModelsTableComponent } from './view-models-table.component';

describe('ViewModelsTableComponent', () => {
  let component: ViewModelsTableComponent;
  let fixture: ComponentFixture<ViewModelsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewModelsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewModelsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
