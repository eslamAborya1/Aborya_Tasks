import { TestBed } from '@angular/core/testing';

import { Contactservices } from './contactservices';

describe('Contactservices', () => {
  let service: Contactservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contactservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
