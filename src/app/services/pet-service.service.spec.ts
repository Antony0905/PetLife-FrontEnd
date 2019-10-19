import { TestBed } from '@angular/core/testing';

import { PetServiceService } from './pet-service.service';

describe('PetServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetServiceService = TestBed.get(PetServiceService);
    expect(service).toBeTruthy();
  });
});
