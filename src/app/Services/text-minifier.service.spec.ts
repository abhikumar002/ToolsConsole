import { TestBed } from '@angular/core/testing';

import { TextMinifierService } from './text-minifier.service';

describe('TextMinifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextMinifierService = TestBed.get(TextMinifierService);
    expect(service).toBeTruthy();
  });
});
