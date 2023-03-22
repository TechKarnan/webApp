import { TestBed } from '@angular/core/testing';

import { WebappApiService } from './webapp-api.service';

describe('WebappApiService', () => {
  let service: WebappApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebappApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
