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
                <p>
                    This is a free site made with the aim of building community
                    and friendships in Bristol.
                </p>
                <p>
                    I started this site as I realised that there are many social
                    groups in Bristol that are not listed on the major event
                    platforms such as Meetup and Eventbrite, which were
                    otherwise hard to find if you didn&apos;t already know about
                    them. I also wanted to gather a list of social groups that
                    are high quality and super friendly; these type of groups...
                </p>
                <p>
                    <ul>
                        <li>Are always open to newcomers</li>
                        <li>Are well developed</li>
                        <li>Meet regularly</li>
                        <li>Are free or low cost</li>
                        <li>Have a shared, inclusive activity</li>
                    </ul>
                </p>
                <h2>Contribution</h2>
                <p>
                    If you know of a group that meets the above criteria, please
                    do suggest it to be added to the site. Suggestions and
                    feedback can be left on this sites{' '}
                    <a
                        className={styles.link}
                        href="https://github.com/jhancock532/social-bristol/issues/new"
                    >
                        Github repository
                    </a>
                    .
                </p>
                <p>This website does not use any cookies or trackers.</p>
            </div>
        </Layout>
    );
}
