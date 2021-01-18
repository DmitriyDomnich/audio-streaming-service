import { Album } from './album';
import { Artist } from './artist';

export interface Track{
    id: string;
    album: Album;
    name: string;
    artists: Artist[];
    isExplicit: boolean;
    releaseDate?: string;
    duration: number;
    added_at: string;
}
