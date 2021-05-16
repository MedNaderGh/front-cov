import { TestBed } from '@angular/core/testing';

import { PositionSRService } from './position-sr.service';

describe('PositionSRService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PositionSRService = TestBed.get(PositionSRService);
    expect(service).toBeTruthy();
  });
});
