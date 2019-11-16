import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModrelatarproblemaPage } from './modrelatarproblema.page';

describe('ModrelatarproblemaPage', () => {
  let component: ModrelatarproblemaPage;
  let fixture: ComponentFixture<ModrelatarproblemaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModrelatarproblemaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModrelatarproblemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
