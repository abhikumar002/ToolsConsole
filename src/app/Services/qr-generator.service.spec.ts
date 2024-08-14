import { TestBed } from '@angular/core/testing';

import { QrGeneratorService } from './qr-generator.service';

describe('QrGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrGeneratorService = TestBed.get(QrGeneratorService);
    expect(service).toBeTruthy();
  });
});
