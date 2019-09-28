import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoPage } from './servico.page';

describe('ServicoPage', () => {
  let component: ServicoPage;
  let fixture: ComponentFixture<ServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
