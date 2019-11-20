import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePetProfilePage } from './update-pet-profile.page';

describe('UpdatePetProfilePage', () => {
  let component: UpdatePetProfilePage;
  let fixture: ComponentFixture<UpdatePetProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePetProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePetProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
