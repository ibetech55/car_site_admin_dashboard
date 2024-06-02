import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McEditModalComponent } from './mc-edit-modal.component';

describe('McEditModalComponent', () => {
  let component: McEditModalComponent;
  let fixture: ComponentFixture<McEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [McEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(McEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
