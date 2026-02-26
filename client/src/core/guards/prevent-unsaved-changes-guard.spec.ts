import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { preventUnsavedChangesGuard } from './prevent-unsaved-changes-guard';
import { MemberProfile } from '../../features/member-profile/member-profile';

describe('preventUnsavedChangesGuard', () => {
  const executeGuard: CanDeactivateFn<MemberProfile> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preventUnsavedChangesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
