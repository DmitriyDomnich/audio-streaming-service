import { Artist } from './artist';

export interface Album {
    id: string;
    name: string;
    albumType?: string;
    image?: string;
    copyrights?: string;
    artists?: Artist[];
    releaseDate?: string;
    total?: number;
}
