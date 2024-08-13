import { TestBed } from '@angular/core/testing';

import { BaseEncoderDecoderService } from './base-encoder-decoder.service';

describe('BaseEncoderDecoderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseEncoderDecoderService = TestBed.get(BaseEncoderDecoderService);
    expect(service).toBeTruthy();
  });
});
