import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import Link from '@/components/Link';
import styles from './More.module.scss';

export default function More() {
    return (
        <Layout>
            <Metadata
                title="Social Bristol - More resources"
                description="Further websites and resources for finding social groups in Bristol."
            />
            <h1 className={styles.title}>More resources</h1>
            <p className={styles.description}>
                Some of the best external websites for finding social groups in
                Bristol.
            </p>
            <h2>Meetup.com</h2>
            <p>
                One of the most active social group sites, Meetup hosts a
                variety of established and fledgling groups, as well as virtual
                events.
            </p>
            <p>
                <Link
                    url="https://www.meetup.com/find/?source=GROUPS&location=gb--bristol&distance=fiveMiles"
                    external
                >
                    Meetup: view all groups in Bristol
                </Link>
            </p>
            <h2>Eventbrite</h2>
            <p>
                A popular platform that shares and tickets many events from
                around the UK. With some searching you&apos;ll find community
                groups that have been using the platform to meet regularly.
            </p>
            <p>
                <Link
                    url="https://www.eventbrite.co.uk/d/united-kingdom--bristol/all-events/"
                    external
                >
                    Eventbrite: view all events in Bristol
                </Link>
            </p>
            <h2>Headfirst</h2>
            <p>
                A Bristol specific website dedicated to listing a wide variety
                of arts, music and club events from all over the area. Often
                better for one-off events, with some more regular social groups
                listed in the &apos;Arts&apos; category.
            </p>
            <p>
                <Link url="https://www.headfirstbristol.co.uk/#home" external>
                    Headfirst: view all events in Bristol
                </Link>
            </p>
            <h2>The Bristol Index</h2>
            <p>
                Not recently updated, but some clubs listed are active and still
                meeting.
            </p>
            <p>
                <Link
                    url="https://www.bristolindex.co.uk/community-clubs.php"
                    external
                >
                    Visit the Bristol Index
                </Link>
            </p>
            <h2>University Student Union Groups</h2>
            <p>
                Students at the University of the West of England or the
                University of Bristol have access to a wide range of student
                groups and societies. Some societies are also open to alumni and
                other members of the public, although these may require some
                form of external membership with the student union to attend.
            </p>
            <p>
                <Link
                    url="https://www.thestudentsunion.co.uk/dosomething/societies/"
                    external
                >
                    UWE Student Union Groups
                </Link>
            </p>
            <p>
                <Link url="https://www.bristolsu.org.uk/groups" external>
                    UoB Student Union Groups
                </Link>
            </p>
            <h2>r/Bristol on Reddit</h2>
            <p>
                If you&apos;ve not found what you&apos;re looking for elsewhere,
                it&apos;s likely worth searching or asking in r/Bristol. See the
                forum sidebar for more websites that list local events.
            </p>
            <p>
                <Link url="https://www.reddit.com/r/bristol/" external>
                    r/Bristol: see all posts
                </Link>
            </p>
        </Layout>
    );
}
