import { Gender } from '@/types/base';

export type EventCost = {
    sessionPrice: number;
    details: string;
};

export type EventBookingType =
    | 'Not required'
    | 'Advised'
    | 'Required'
    | boolean; // Where `true` is required and `false` is not required.

export type EventBooking = {
    required: EventBookingType;
    details: string;
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
    slug?: string;
    details?: string;
    url?: string;
    time?: EventTime;
    location: EventLocation;
    locationURL?: string;
    cost?: EventCost;
    booking?: EventBooking;
    gender?: Gender; // defaults to all if left blank
};
