import fs from 'fs';
import { join } from 'path';
import EventCard from '@/components/EventCard';
import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import { getDirectories } from '@/utils/utils';
import styles from './Index.module.scss';

export default function Home({ events }: any) {
    return (
        <Layout>
            <Metadata
                title="Social Bristol"
                description="A list of regular meetups in Bristol that are open to newcomers."
            />
            <h1 className={styles.title}>Social Bristol</h1>
            <p className={styles.description}>
                A list of regular meetups in Bristol that are open to newcomers.
            </p>
            <div className={styles.events}>
                {events.map((event: any, index: number) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>
        </Layout>
    );
}

const EVENT_DETAILS_PATH = join(process.cwd(), 'data/events');

export const getStaticProps = async () => {
    const paths = getDirectories(EVENT_DETAILS_PATH);

    const events = paths.map((path: string) => {
        const fullEventPath = join(EVENT_DETAILS_PATH, path, 'details.json');
        const eventData = JSON.parse(
            fs.readFileSync(fullEventPath, { encoding: 'utf8' }),
        );

        return eventData;
    });

    return {
        props: {
            events,
        },
    };
};
