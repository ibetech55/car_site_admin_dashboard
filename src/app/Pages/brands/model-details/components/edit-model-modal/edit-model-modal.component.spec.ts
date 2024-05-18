import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelModalComponent } from './edit-model-modal.component';

describe('EditModelModalComponent', () => {
  let component: EditModelModalComponent;
  let fixture: ComponentFixture<EditModelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditModelModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditModelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
