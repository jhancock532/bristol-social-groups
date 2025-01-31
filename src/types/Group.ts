import { Gender, Link, Subscription } from '@/types/base';
import { Event } from '@/types/Event';

export type Group = {
    name: string;
    slug: string;
    description: string; // a one or two sentence description of the group
    links: Link[]; // a list of links to the group's online presence
    tags: string[];
    details?: string; // optional extended description displayed on the event slug page
    events?: Event[];
    gender?: Gender; // defaults to all if left blank
    subscriptions?: Subscription[];
};
