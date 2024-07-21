import { TestBed } from '@angular/core/testing';
import { JsonValidationService } from './json-validation.service';

describe('JsonValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonValidationService = TestBed.get(JsonValidationService);
    expect(service).toBeTruthy();
  });
});

