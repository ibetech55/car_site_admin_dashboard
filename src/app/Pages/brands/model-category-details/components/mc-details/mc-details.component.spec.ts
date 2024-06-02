import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McDetailsComponent } from './mc-details.component';

describe('McDetailsComponent', () => {
  let component: McDetailsComponent;
  let fixture: ComponentFixture<McDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [McDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(McDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
