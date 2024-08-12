import { TestBed } from '@angular/core/testing';

import { PasswordGeneratorService } from './password-generator.service';

describe('PasswordGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordGeneratorService = TestBed.get(PasswordGeneratorService);
    expect(service).toBeTruthy();
  });
});
