import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosContratadosPage } from './servicos-contratados.page';

describe('ServicosContratadosPage', () => {
  let component: ServicosContratadosPage;
  let fixture: ComponentFixture<ServicosContratadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicosContratadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosContratadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
