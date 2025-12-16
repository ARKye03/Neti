import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsList } from './forms-list';

describe('FormsList', () => {
  let component: FormsList;
  let fixture: ComponentFixture<FormsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
