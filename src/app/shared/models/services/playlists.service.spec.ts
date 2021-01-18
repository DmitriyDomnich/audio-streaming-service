/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaylistsService } from './playlists.service';

describe('Service: Playlists', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistsService]
    });
  });

  it('should ...', inject([PlaylistsService], (service: PlaylistsService) => {
    expect(service).toBeTruthy();
  }));
});
