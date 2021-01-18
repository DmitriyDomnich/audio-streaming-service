import { User } from 'src/app/shared/models/user';

export interface Playlist{
    id: string;
    name: string;
    description?: string;
    image?: string;
    user?: User;
    public?: boolean;
    followers?: number;
}
