import { Album } from './album';
import { Artist } from './artist';
import { Playlist } from './playlist';
import { Track } from './track';

export interface Search{
    tracks?: Track[];
    albums?: Album[];
    artists?: Artist[];
    playlists?: Playlist[];
}
