import Head from 'next/head';
import styles from '@/styles/Index.module.scss';
import events from 'data/events.json';

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
                            <div className={styles.event} key={index}>
                                <h2 className={styles.eventTitle}>
                                    {event.name}
                                </h2>
                                <p className={styles.eventDescription}>
                                    {event.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
