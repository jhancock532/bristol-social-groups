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
    locationIndex: number,
): Event => {
    const locations = [
        {
            address: '123 Example Street, Bristol, BS19 1AA',
            latitude: '51.456098',
            longitude: '-2.590541',
            googleMapsLink: 'https://goo.gl/maps/example1',
        },
        {
            address: '456 Example Street, Bristol, BS19 1AB',
            latitude: '51.458198',
            longitude: '-2.596641',
            googleMapsLink: 'https://goo.gl/maps/example2',
        },
        {
            address: '789 Example Street, Bristol, BS19 1AC',
            latitude: '51.450298',
            longitude: '-2.601741',
            googleMapsLink: 'https://goo.gl/maps/example3',
        },
    ];
    return {
        time: { weekday, start, end, frequency },
        location: locations[locationIndex],
        cost: { sessionPrice: 10, details: 'Per session' },
        booking: { required: 'Advised', details: 'Booking is recommended' },
        link: {
            url: 'https://example.com/event',
            type: 'Website',
        },
    };
};

export const MOCK_EVENTS: Event[] = [
    createMockEvent(
        'Monday',
        '2024-07-22T18:00:00Z',
        '2024-07-22T20:00:00Z',
        'Weekly',
        0,
    ),
    createMockEvent(
        'Wednesday',
        '2024-07-24T19:00:00Z',
        '2024-07-24T21:00:00Z',
        'Weekly',
        1,
    ),
    createMockEvent(
        'Friday',
        '2024-07-26T17:30:00Z',
        '2024-07-26T19:30:00Z',
        'Weekly',
        2,
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
        links: [
            {
                url: 'https://lorem.ipsum/dolor',
                type: 'Website',
            },
            {
                url: 'https://lorem.ipsum/dolor',
                type: 'Facebook',
            },
        ],
    },
    {
        name: 'Sit Amet Minim Veniam Quis Nostrud',
        slug: 'sit-amet',
        description:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tags: ['sit', 'amet', 'consectetur'],
        events: undefined,
        links: [
            {
                url: 'https://lorem.ipsum/dolor',
                type: 'Discord',
            },
        ],
    },
    {
        name: 'Adipiscing Elit',
        slug: 'adipiscing-elit',
        description:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        tags: ['adipiscing', 'elit', 'sed'],
        events: MOCK_EVENTS,
        links: [
            {
                url: 'https://lorem.ipsum/dolor',
                type: 'WhatsApp',
            },
        ],
    },
];
