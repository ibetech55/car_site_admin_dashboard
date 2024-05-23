import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMakeFormComponent } from './create-make-form.component';

describe('CreateMakeFormComponent', () => {
  let component: CreateMakeFormComponent;
  let fixture: ComponentFixture<CreateMakeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMakeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
