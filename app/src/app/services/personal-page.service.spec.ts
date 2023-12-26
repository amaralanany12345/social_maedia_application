import { TestBed } from '@angular/core/testing';

import { PersonalPageService } from './personal-page.service';

describe('PersonalPageService', () => {
  let service: PersonalPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
