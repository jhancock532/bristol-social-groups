import React from 'react';
import fs from 'fs';
import { join } from 'path';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import type { Event } from '@/types/types';
import { getDirectories } from '@/utils/utils';
import styles from './Index.module.scss';

const BristolMap = dynamic(() => import('@/components/BristolMap'), {
    ssr: false,
});

type MapProps = {
    events: Event[];
};

export default function Map({ events }: MapProps) {
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
            </Layout>
        </div>
    );
}

const EVENT_DETAILS_PATH = join(process.cwd(), 'data/events');

export const getStaticProps = async () => {
    const paths = getDirectories(EVENT_DETAILS_PATH);

    const eventDetails = paths.map((path: string) => {
        const fullEventPath = join(EVENT_DETAILS_PATH, path, 'details.json');
        const eventData = JSON.parse(
            fs.readFileSync(fullEventPath, { encoding: 'utf8' }),
        );

        return eventData;
    });

    const events = [];

    for (let i = 0; i < eventDetails.length; i += 1) {
        for (let j = 0; j < eventDetails[i].events.length; j += 1) {
            let mapDisplayEvent;

            mapDisplayEvent = eventDetails[i].events[j];
            mapDisplayEvent.slug = eventDetails[i].slug;
            mapDisplayEvent.name = eventDetails[i].name;

            events.push(mapDisplayEvent);
        }
    }

    return {
        props: {
            events,
        },
    };
};
