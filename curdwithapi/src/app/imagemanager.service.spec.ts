import { TestBed } from '@angular/core/testing';

import { ImagemanagerService } from './imagemanager.service';

describe('ImagemanagerService', () => {
  let service: ImagemanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagemanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
