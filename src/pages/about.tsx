import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import styles from './Index.module.scss';

export default function About() {
    return (
        <Layout>
            <Metadata
                title="Social Bristol - About"
                description="A list of regular meetups in Bristol that are open to newcomers."
            />
            <div className={styles.hero}>
                <h1 className={styles.title}>About</h1>
                <h2>Aim</h2>
                <p>To build community and friendships in Bristol.</p>
                <h2>Method</h2>
                <p>
                    List regularly meeting, actively attended, well developed
                    social groups in a single place, and provide tools for
                    individuals to find a group they are interested in attending
                    (search, filters, ...).
                </p>
                <p>
                    Events listed here should run consistently, so attendees can
                    join regularly and get to know each other over time.
                </p>
                <h2>Issues with other sites</h2>
                <p>
                    Meetup, Eventbrite, etc list many one-off events, which
                    aren&apos;t as good for building longer term connections.
                    High quality social groups organised on external sites may
                    also be listed here.
                </p>
                <p>
                    We already have apps to connect individuals one-on-one with
                    the aim of friendship (e.g. Bumble). These apps don&apos;t
                    allow filtering by a shared activity, and place all the
                    responsibility on the user to organise events.
                </p>
                <h2>Contribution</h2>
                <p>
                    This site is in early development, and will change over time
                    through discussion, community contributions and feedback.
                </p>
                <p>Comments can be made on this sites Github repository.</p>
                <p>Thank you for visiting.</p>
            </div>
        </Layout>
    );
}
