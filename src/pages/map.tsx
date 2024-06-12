import React from 'react';
import fs from 'fs';
import { join } from 'path';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import EventCard from '@/components/EventCard';
import type { Event } from '@/types/types';
import { getDirectories } from '@/utils/utils';
import styles from './Index.module.scss';

const BristolMap = dynamic(() => import('@/components/BristolMap'), {
    ssr: false,
});

type MapProps = {
    events: Event[];
    groups: any[];
};

export default function Map({ events, groups }: MapProps) {
    const groupsWithEventsWithoutLocation = groups.filter((group) =>
        group.events.some((event: Event) => event.locationURL),
    );

    return (
        <div>
            <Layout>
                <Metadata
                    title="Social Bristol - Map"
                    description="A map of regular meetups in Bristol that are open to newcomers."
                />
                <div className={styles.mapHero}>
                    <h1 className={styles.title}>Map</h1>
                    <p className={styles.mapDescription}>
                        View all social groups based on their location.
                    </p>
                </div>
                <BristolMap events={events} />

                <h2>Events without regular locations</h2>
                <p>
                    Some groups announce upcoming event locations on social
                    media or external sites; these aren&apos;t shown on the map
                    above, and are included below.
                    <br />
                    <br />
                </p>

                {groupsWithEventsWithoutLocation.map((group) => (
                    <EventCard
                        key={group.slug}
                        name={group.name}
                        slug={group.slug}
                        description={group.description}
                        events={group.events}
                    />
                ))}
            </Layout>
        </div>
    );
}

const EVENT_DETAILS_PATH = join(process.cwd(), 'data/events');

export const getStaticProps = async () => {
    const paths = getDirectories(EVENT_DETAILS_PATH);

    const groups = paths.map((path: string) => {
        const fullEventPath = join(EVENT_DETAILS_PATH, path, 'details.json');
        const eventData = JSON.parse(
            fs.readFileSync(fullEventPath, { encoding: 'utf8' }),
        );

        return eventData;
    });

    const events = [];

    for (let i = 0; i < groups.length; i += 1) {
        for (let j = 0; j < groups[i].events.length; j += 1) {
            let mapDisplayEvent;

            mapDisplayEvent = groups[i].events[j];
            mapDisplayEvent.slug = groups[i].slug;
            mapDisplayEvent.name = groups[i].name;

            events.push(mapDisplayEvent);
        }
    }

    return {
        props: {
            events,
            groups,
        },
    };
};
