import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMakesComponent } from './view-makes.component';

describe('ViewMakesComponent', () => {
  let component: ViewMakesComponent;
  let fixture: ComponentFixture<ViewMakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMakesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
