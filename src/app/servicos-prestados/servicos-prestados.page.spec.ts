import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosPrestadosPage } from './servicos-prestados.page';

describe('ServicosPrestadosPage', () => {
  let component: ServicosPrestadosPage;
  let fixture: ComponentFixture<ServicosPrestadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicosPrestadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosPrestadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
