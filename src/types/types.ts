export type IconProps = {
    className?: string;
    fill?: string;
};

export type EventLocation = {
    address: string;
    latitude: string;
    longitude: string;
    googleMapsLink: string;
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
    description?: string;
};
