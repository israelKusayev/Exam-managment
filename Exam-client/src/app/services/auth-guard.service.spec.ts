import { TestBed } from '@angular/core/testing';

import { AdminAuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAuthGuardService = TestBed.get(AdminAuthGuardService);
    expect(service).toBeTruthy();
  });
});
