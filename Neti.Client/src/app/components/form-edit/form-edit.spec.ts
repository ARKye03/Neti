import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEdit } from './form-edit';

describe('FormEdit', () => {
  let component: FormEdit;
  let fixture: ComponentFixture<FormEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
