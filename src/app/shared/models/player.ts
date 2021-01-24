import { PlayerState } from './player-state';
import { Song } from './song';

export interface Player{
    currentSong?: Song;
    playerState?: PlayerState;
}
