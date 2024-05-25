import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDetailsInfoComponent } from './make-details-info.component';

describe('MakeDetailsInfoComponent', () => {
  let component: MakeDetailsInfoComponent;
  let fixture: ComponentFixture<MakeDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeDetailsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
