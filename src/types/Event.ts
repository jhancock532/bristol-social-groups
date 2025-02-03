import { Gender, Link } from '@/types/base';

export type EventCost = {
    sessionPrice?: number;
    details?: string;
};

export type EventBookingType = 'Not required' | 'Advised' | 'Required';

export type EventBooking = {
    required: EventBookingType;
    details?: string;
};

export type EventLocation = {
    address: string;
    latitude: string;
    longitude: string;
    googleMapsLink: string;
    details?: string;
};

export type EventTime = {
    frequency: 'Weekly' | 'Fortnightly' | 'Monthly' | string;
    weekday:
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday'
        | 'Sunday';
    start: string;
    end: string;
    details?: string;
};

export type Event = {
    name?: string;
    details?: string;
    link?: Link; // If a specific URL that has details for this event is available, provide it here
    time?: EventTime;
    location: EventLocation;
    locationURL?: string; // If the event doesn't have a regular location, provide a link to where the user can find out this information
    cost?: EventCost;
    booking?: EventBooking;
    gender?: Gender; // defaults to all if left blank
    accessibility?: string;
};
