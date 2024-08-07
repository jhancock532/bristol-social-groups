import { Group } from '@/types/Group';
import { Event } from '@/types/Event';

const createMockEvent = (
    weekday:
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday'
        | 'Sunday',
    start: string,
    end: string,
    frequency: string,
): Event => ({
    time: { weekday, start, end, frequency },
    location: {
        address: '123 Example Street, Bristol, BS19 1AA',
        latitude: (51.456098 + Math.random() / 50 - 0.01).toString(),
        longitude: (-2.596541 + Math.random() / 50 - 0.01).toString(),
        googleMapsLink: 'https://goo.gl/maps/example',
    },
    cost: { sessionPrice: 10, details: 'Per session' },
    booking: { required: 'Advised', details: 'Booking is recommended' },
    url: 'https://example.com/event',
});

export const MOCK_EVENTS: Event[] = [
    createMockEvent(
        'Monday',
        '2024-07-22T18:00:00Z',
        '2024-07-22T20:00:00Z',
        'Weekly',
    ),
    createMockEvent(
        'Wednesday',
        '2024-07-24T19:00:00Z',
        '2024-07-24T21:00:00Z',
        'Weekly',
    ),
    createMockEvent(
        'Friday',
        '2024-07-26T17:30:00Z',
        '2024-07-26T19:30:00Z',
        'Weekly',
    ),
];

export const MOCK_GROUPS: Group[] = [
    {
        name: 'Lorem Ipsum',
        slug: 'lorem-ipsum',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: ['lorem', 'ipsum', 'dolor'],
        events: [MOCK_EVENTS[0], MOCK_EVENTS[1]],
        type: 'Regular',
        url: 'https://lorem.ipsum/dolor',
    },
    {
        name: 'Sit Amet Minim Veniam Quis Nostrud',
        slug: 'sit-amet',
        description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tags: ['sit', 'amet', 'consectetur'],
        events: undefined,
        type: 'Discord',
        url: 'https://sit.amet/consectetur',
    },
    {
        name: 'Adipiscing Elit',
        slug: 'adipiscing-elit',
        description:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        tags: ['adipiscing', 'elit', 'sed'],
        events: MOCK_EVENTS,
        type: 'Regular',
        url: 'https://adipiscing.elit/sed',
    },
];
