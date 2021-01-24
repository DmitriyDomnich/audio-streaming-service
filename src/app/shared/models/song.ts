import { Album } from './album';
import { Artist } from './artist';

export interface Song {
    id: string;
    name: string;
    album: Album;
    artists: Artist[];
    progress: number;
}
