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
                    This is a free site made without advertising or tracking,
                    with the aim of building community and friendships in
                    Bristol.
                </p>
                <p>
                    I started this site as I realised that there are many social
                    groups in Bristol that are not listed on the major event
                    platforms such as Meetup and Eventbrite. I also wanted to
                    curate social groups that are of a high quality; these type
                    of groups...
                </p>
                <p>
                    <ul>
                        <li>Are welcoming to newcomers</li>
                        <li>Are well developed</li>
                        <li>Meet regularly</li>
                        <li>Are free or low cost</li>
                        <li>Have a shared, inclusive activity</li>
                    </ul>
                    I&apos;m currently not listing groups that are exclusive to
                    a particular religious affiliation, career background or
                    protected characteristic. I would like to list these groups
                    in the future, with information about who the group is
                    suitable for, and an option to toggle / filter these groups,
                    so it&apos;s easy for people to find groups relevant to
                    them.
                </p>
                <h2>Contribution</h2>
                <p>
                    This site is in early development; please do suggest groups
                    to be added and share your feedback. I&apos;d love to add
                    more features for how to discover groups, including search
                    features and an overall map view.
                </p>
                <p>
                    Please leave suggestions and feedback on this sites{' '}
                    <a
                        className={styles.link}
                        href="https://github.com/jhancock532/social-bristol/issues/new"
                    >
                        Github repository
                    </a>
                    .
                </p>
                <p>Thank you for visiting!</p>
            </div>
        </Layout>
    );
}
