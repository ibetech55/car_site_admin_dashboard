import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDetailsModelsTableComponent } from './make-details-models-table.component';

describe('MakeDetailsModelsTableComponent', () => {
  let component: MakeDetailsModelsTableComponent;
  let fixture: ComponentFixture<MakeDetailsModelsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeDetailsModelsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeDetailsModelsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
