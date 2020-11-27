import { TestBed } from '@angular/core/testing';

import { NextGuard } from './next.guard';

describe('NextGuard', () => {
  let guard: NextGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NextGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
