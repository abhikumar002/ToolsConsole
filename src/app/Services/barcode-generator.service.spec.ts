import { TestBed } from '@angular/core/testing';

import { BarcodeGeneratorService } from './barcode-generator.service';

describe('BarcodeGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BarcodeGeneratorService = TestBed.get(BarcodeGeneratorService);
    expect(service).toBeTruthy();
  });
});
