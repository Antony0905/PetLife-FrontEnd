import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUpdatePetPage } from './view-update-pet.page';

describe('ViewUpdatePetPage', () => {
  let component: ViewUpdatePetPage;
  let fixture: ComponentFixture<ViewUpdatePetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUpdatePetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUpdatePetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
