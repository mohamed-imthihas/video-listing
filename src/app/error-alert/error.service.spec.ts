import { TestBed, inject } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let errorService: ErrorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorService]
    });
  });
  beforeEach(inject([ErrorService], (service: ErrorService) => {
    errorService = service;
  }));
  it('should be created', () => {
    expect(errorService).toBeTruthy();
  });
  it('should emit error message', (done: DoneFn) => {
    errorService.errorSource$.subscribe((data) => {
      expect(data).toEqual('Error happened');
      done();
    })
    errorService.showError('Error happened');
  });
});
