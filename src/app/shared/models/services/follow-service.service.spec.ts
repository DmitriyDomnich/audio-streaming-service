/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FollowServiceService } from './follow-service.service';

describe('Service: FollowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FollowServiceService]
    });
  });

  it('should ...', inject([FollowServiceService], (service: FollowServiceService) => {
    expect(service).toBeTruthy();
  }));
});
