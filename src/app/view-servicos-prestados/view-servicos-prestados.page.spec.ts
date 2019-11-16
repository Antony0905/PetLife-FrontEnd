import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServicosPrestadosPage } from './view-servicos-prestados.page';

describe('ViewServicosPrestadosPage', () => {
  let component: ViewServicosPrestadosPage;
  let fixture: ComponentFixture<ViewServicosPrestadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewServicosPrestadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServicosPrestadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
