import { Gender } from '@/types/base';
import { Event } from '@/types/Event';

export type GroupType = 'Discord' | 'Regular' | 'Ad-hoc' | string;

export type Group = {
    name: string;
    slug: string;
    description: string; // a one or two sentence description of the group
    details?: string; // optional extended description displayed on the event slug page
    tags: string[];
    events?: Event[];
    type?: GroupType;
    url?: string; // a link to the groups homepage or group chat invite
    gender?: Gender; // defaults to all if left blank
};
