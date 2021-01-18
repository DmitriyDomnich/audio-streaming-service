import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from 'src/app/shared/models/playlist';
import { CategoryPlaylistsService } from '../../shared/category-playlists.service';

@Component({
  selector: 'app-category-playlists',
  templateUrl: './category-playlists.component.html',
  styleUrls: ['./category-playlists.component.scss'],
})
export class CategoryPlaylistsComponent implements OnInit {
    id = '1';
    playlists: Playlist[] = [];
    constructor(
        private categoryPlaylistsService: CategoryPlaylistsService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        const idLit = 'id';
        this.id = this.activatedRoute.snapshot.params[idLit];
        this.categoryPlaylistsService.getPLaylistsByCategoryId(this.id).subscribe((data: any) => {
            this.playlists = data;
        });
    }
    goToPlaylist(id: string): void{
        this.router.navigate(['playlist', id]);
    }
}
