import { TestBed } from '@angular/core/testing';

import { XmlValidatorService } from './xml-validator.service';

describe('XmlValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XmlValidatorService = TestBed.get(XmlValidatorService);
    expect(service).toBeTruthy();
  });
});
