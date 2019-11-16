import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModfinalizarPage } from './modfinalizar.page';

describe('ModfinalizarPage', () => {
  let component: ModfinalizarPage;
  let fixture: ComponentFixture<ModfinalizarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModfinalizarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModfinalizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
