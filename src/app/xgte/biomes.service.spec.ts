import { TestBed } from '@angular/core/testing';

import { BiomesService } from './biomes.service';

describe('BiomesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiomesService = TestBed.get(BiomesService);
    expect(service).toBeTruthy();
  });
});
