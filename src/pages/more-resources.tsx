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
                Bristol. For more general community groups specific to Bristol,
                see the <Link url="#community-groups">Community Groups</Link>{' '}
                section.
            </p>
            <h2>Bristol Queer Directory</h2>
            <p>
                A spreadsheet listing LGBT+ social groups in Bristol. The
                directory also includes events, local businesses, support
                services and other resources.
            </p>
            <p>
                <Link
                    url="https://docs.google.com/spreadsheets/d/1OAW6vUZCFlXs-lWPvR_GHrHM7uGhJ8YzBdA7uX-_1ek/edit?gid=0#gid=0"
                    external
                >
                    View all LGBT+ groups in Bristol
                </Link>
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
            <h2>Facebook</h2>
            <p>
                Many local groups are listed on Facebook, some more active than
                others. Filter by location and search for something you are
                interested in, note that not all groups will have
                &apos;Bristol&apos; in their title.
            </p>
            <p>
                <Link
                    url="https://www.facebook.com/search/groups/?q=bristol"
                    external
                >
                    Facebook: search for groups
                </Link>
            </p>
            <p>
                <strong>See also:</strong> A highly recommended community group
                for women is <Link url="#bristol-girl">Bristol Girl</Link>, and
                a male counterpart has been recently created called{' '}
                <Link url="#bristol-men">Bristol Men</Link>.
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
                Students at the various universities in Bristol have access to a
                wide range of student groups and societies. Some societies are
                open to alumni and other members of the public, although these
                may require external membership with the student union to
                attend.
            </p>
            <p>
                <Link url="https://linktr.ee/signup.to.societies" external>
                    BIMM Student Association Bristol Groups
                </Link>
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

            <h2 id="community-groups">Community Groups</h2>
            <p>
                Recommended networks to meet new people and ask questions
                related to Bristol. Bristol Girl is very popular with over 25
                thousand members, it recently inspired the creation of the
                Bristol Men group.
            </p>

            <h3 id="bristol-girl">Bristol Girl Facebook Group</h3>
            <p>
                Bristol Girl is a project dedicated to empowering, inspiring and
                supporting all women living in Bristol. We are running monthly
                meet ups, which will range from coffee chats, to activities, to
                aspirational panel events, in order to connect the Bristol Girl
                community and create a support network for all women. We want to
                help each other make the most of this wonderful city that we
                call home.
            </p>
            <p>
                <Link
                    url="https://www.facebook.com/groups/bristolgirl"
                    external
                >
                    Facebook: Bristol Girl community group
                </Link>
            </p>
            <h3 id="bristol-men">Bristol Men Facebook Group</h3>
            <p>
                Has your girlfriend not shut up about Bristol Girl? Do you need
                an extra man for your Sunday league team? Are you sick of having
                nobody to play Wii Sports with? Well this is the answer! Feel
                free to find friends, ask for recommendations or anything
                friendly here.
            </p>
            <p>
                <Link
                    url="https://www.facebook.com/groups/851762896575341"
                    external
                >
                    Facebook: Bristol Men community group
                </Link>
            </p>

            <h3>r/Bristol on Reddit</h3>
            <p>
                If you&apos;ve not found what you&apos;re looking for elsewhere,
                it&apos;s likely worth searching or asking in r/Bristol. See the
                forum sidebar for even more resources.
            </p>
            <p>
                <Link url="https://www.reddit.com/r/bristol/" external>
                    r/Bristol: see all posts
                </Link>
            </p>
        </Layout>
    );
}
