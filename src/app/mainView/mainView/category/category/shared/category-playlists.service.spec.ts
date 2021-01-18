/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryPlaylistsService } from './category-playlists.service';

describe('Service: CategoriesPlaylists', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryPlaylistsService]
    });
  });

  it('should ...', inject([CategoryPlaylistsService], (service: CategoryPlaylistsService) => {
    expect(service).toBeTruthy();
  }));
});
