export type IconProps = {
    className?: string;
    fill?: string;
};

export type EventCost = {
    sessionPrice: number;
    details: string;
};

export type EventBooking = {
    required: boolean;
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
