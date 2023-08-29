import Head from 'next/head';
import events from '@/../data/events.json';
import EventCard from '@/components/EventCard';
import styles from './Index.module.scss';

export default function Home() {
    return (
        <>
            <Head>
                <title>Social Bristol</title>
                <meta name="description" content="" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                    crossOrigin=""
                />
            </Head>
            <div className={styles.container}>
                <div className={styles.sidebar}></div>
                <main className={styles.content}>
                    <h1 className={styles.title}>Social Bristol</h1>
                    <p>
                        A collection of regular social meetups in Bristol that
                        are open to newcomers.
                    </p>
                    <div className={styles.events}>
                        {events.map((event: any, index: number) => (
                            <EventCard key={index} {...event} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
