import { TestBed } from '@angular/core/testing';

import { AdminguardService } from './adminguard.service';

describe('AdminguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminguardService = TestBed.get(AdminguardService);
    expect(service).toBeTruthy();
  });
});
