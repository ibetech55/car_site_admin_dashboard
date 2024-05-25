import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMakeDialogComponent } from './edit-make-dialog.component';

describe('EditMakeDialogComponent', () => {
  let component: EditMakeDialogComponent;
  let fixture: ComponentFixture<EditMakeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMakeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMakeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
