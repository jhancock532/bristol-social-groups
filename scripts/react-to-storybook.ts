/* eslint-disable no-console */
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { config } from 'dotenv';
import { toCamelCase, readFile, logAnthropicAPICost } from './utils.js';

config();

const MODEL = process.env.ANTHROPIC_MODEL as string;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const anthropic = new Anthropic({});

const exampleDocumentation = `
--- REACT COMPONENT ---
import React from 'react';
import Link from 'next/link';
import { ClockIcon } from '@/components/Icons/ClockIcon';
import { WalletIcon } from '@/components/Icons/WalletIcon';
import { LocationIcon } from '@/components/Icons/LocationIcon';
import { ReceiptIcon } from '@/components/Icons/ReceiptIcon';
import { ExternalIcon } from '@/components/Icons/ExternalIcon';
import { FemaleIcon } from '@/components/Icons/FemaleIcon';
import { MaleIcon } from '@/components/Icons/MaleIcon';
import { getAMPMTimeFromDateString } from '@/utils/utils';
import { Event } from '@/types/Event';
import styles from './EventCard.module.scss';

const EventCard = ({
    cost,
    time,
    location,
    locationURL,
    booking,
    url,
    gender,
}: Event) => {
    return (
        <div className={styles.details}>
            {gender && (
                <div className={styles.details__item}>
                    {gender === 'Women' && (
                        <FemaleIcon className={styles.details__icon} />
                    )}
                    {gender === 'Men' && (
                        <MaleIcon className={styles.details__icon} />
                    )}
                    <p>Open to {gender.toLowerCase()} only.</p>
                </div>
            )}
            {time && (
                <div className={styles.details__item}>
                    <ClockIcon className={styles.details__icon} />
                    <p>
                        {time.frequency === 'Weekly' ? (
                            <>
                                Every <strong>{time.weekday}</strong>
                            </>
                        ) : (
                            <strong>{time.frequency}</strong>
                        )}{' '}
                        from{' '}
                        <strong>{getAMPMTimeFromDateString(time.start)}</strong>{' '}
                        to{' '}
                        <strong>{getAMPMTimeFromDateString(time.end)}</strong>
                    </p>
                </div>
            )}
            {cost && (
                <div className={styles.details__item}>
                    <WalletIcon className={styles.details__icon} />
                    <p>
                        Costs <strong>£{cost.sessionPrice.toFixed(2)}</strong>{' '}
                        per session
                    </p>
                </div>
            )}
            {booking && booking.required && (
                <div className={styles.details__item}>
                    <ReceiptIcon className={styles.details__icon} />
                    <p>
                        {booking.required === 'Advised' ? (
                            <span>Advance booking advised</span>
                        ) : (
                            <strong>Advance booking required</strong>
                        )}
                    </p>
                </div>
            )}
            <div className={styles.details__item}>
                <LocationIcon className={styles.details__icon} />
                <div className={styles.locationContainer}>
                    {location && (
                        <p>
                            Meets at{' '}
                            <a
                                className={styles.googleMapsLink}
                                href={location.googleMapsLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {location.address}
                                <ExternalIcon />
                            </a>
                        </p>
                    )}
                    {locationURL && (
                        <p>
                            This event&apos;s location changes,{' '}
                            <Link
                                href={locationURL}
                                className={styles.googleMapsLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                click here for the latest details
                                <ExternalIcon />
                            </Link>
                        </p>
                    )}
                </div>
            </div>
            <div className={styles.details__item}>
                <a
                    className={styles.externalLink}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                >
                    View group&apos;s website <ExternalIcon />
                </a>
            </div>
        </div>
    );
};

export default EventCard;

--- STORYBOOK STORY ---
import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_EVENTS } from '@/stories/mocks';
import EventCard from './EventCard';

const meta = {
    title: 'Components/Cards/EventCard',
    component: EventCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        cost: { control: 'object' },
        time: { control: 'object' },
        location: { control: 'object' },
        locationURL: { control: 'text' },
        booking: { control: 'object' },
        url: { control: 'text' },
    },
    args: {},
} satisfies Meta<typeof EventCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { ...MOCK_EVENTS[0] },
};

--- REACT COMPONENT ---
'use client';

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Link from 'next/link';
import { rubik } from '@/pages/_app';
import { ExternalIcon } from '../Icons/ExternalIcon';
import styles from './Map.module.scss';

type MapProps = {
    groups: any[];
    selectedWeekday?: string;
};

const Map = ({ groups, selectedWeekday }: MapProps) => {
    const events = [];

    for (let i = 0; i < groups.length; i += 1) {
        if (groups[i].events) {
            for (let j = 0; j < groups[i].events.length; j += 1) {
                let event;

                event = groups[i].events[j];
                event.slug = groups[i].slug;
                event.name = groups[i].name;

                if (groups[i].events[j].location) {
                    if (
                        selectedWeekday &&
                        selectedWeekday !== 'All' &&
                        groups[i].events[j].time &&
                        groups[i].events[j].time.weekday !== selectedWeekday
                    ) {
                        // eslint-disable-next-line no-continue
                        continue;
                    }
                    events.push(event);
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            <MapContainer
                center={[51.456098, -2.596541]}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {events.map((event, index) => (
                    <Marker
                        key={index}
                        position={[
                            parseFloat(event.location.latitude),
                            parseFloat(event.location.longitude),
                        ]}
                    >
                        <Popup className={rubik.className}>
                            <p className={styles.popupTitle}>
                                <Link href={event.slug}>
                                    {event.name}
                                </Link>
                            </p>
                            <p className={styles.popupText}>
                                {event.location.address}
                            </p>
                            <a
                                className={styles.eventLink}
                                href={event.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View group&apos;s website <ExternalIcon />
                            </a>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;

--- STORYBOOK STORY ---
import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_GROUPS } from '@/stories/mocks';
import Map from './Map';

const meta = {
    title: 'Components/Map',
    component: Map,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        groups: { control: 'object' },
    },
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        groups: MOCK_GROUPS,
    },
};

`;

const baseComponentsDirectoryName = 'src/components';

rl.question('\x1b[1mEnter a component name:\x1b[0m ', async (componentName) => {
    const camelCaseComponentName = toCamelCase(componentName);

    const outputFilePath = `src/components/${camelCaseComponentName}/claude.${camelCaseComponentName}.stories.ts`;

    const inputFilePath = path.join(
        baseComponentsDirectoryName,
        camelCaseComponentName,
        `/${camelCaseComponentName}.tsx`,
    );

    const inputMocksFilePath = `src/stories/mocks.ts`;

    const reactComponentCode = readFile(inputFilePath);
    const mocksCode = readFile(inputMocksFilePath);
    console.log(
        `\x1b[3mConverting React component to Storybook documentation...\x1b[0m`,
    );

    // eslint-disable-next-line no-await-in-loop
    const msg = await anthropic.messages.create({
        model: MODEL,
        system: `Here are some examples of Storybook documentation of React components.
        ${exampleDocumentation}
        Here are some mock constants for the Storybook stories, as found in @stories/mocks:

        ${mocksCode}

        Please write the Storybook story for the following React component. Do not include any other commentary or backticks, respond only with the converted code. If you'd like to add content to the mocks file, please write this before the converted code.`,
        max_tokens: 4096,
        messages: [{ role: 'user', content: reactComponentCode }],
    });

    if (msg.content[0].type === 'text') {
        fs.writeFile(outputFilePath, msg.content[0].text, (err) => {
            if (err) {
                console.error(
                    'An error occurred while creating the file:',
                    err,
                );
            } else {
                console.log(`\x1b[1m\x1b[32mFile created successfully.\x1b[0m`);
            }
        });
    }

    logAnthropicAPICost(msg.usage, process.env.ANTHROPIC_MODEL as string);

    rl.close();
});
