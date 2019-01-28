import { TestBed } from '@angular/core/testing';

import { DungeonService } from './dungeon.service';

describe('DungeonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DungeonService = TestBed.get(DungeonService);
    expect(service).toBeTruthy();
  });
});
