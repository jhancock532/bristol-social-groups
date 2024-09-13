import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import Link from '@/components/Link';
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
                <p className={styles.description}>
                    Bristol Social Groups is volunteer run site with the goal of
                    building community and friendship across Bristol.
                </p>

                <h2>Background</h2>
                <p>
                    There are many social groups in Bristol that are not listed
                    or easily found on{' '}
                    <Link url="/more-resources">major event platforms</Link>,
                    making these groups hard to find and take part in. This site
                    intends to bridge this gap by providing a free, curated list
                    of these missing groups.
                </p>
                <p>It intends to share high-quality social groups that:</p>
                <ul>
                    <li>Are open to newcomers</li>
                    <li>Are well attended</li>
                    <li>Meet regularly</li>
                    <li>Are free or low cost</li>
                    <li>
                        Have a shared, inclusive and proactively social activity
                    </li>
                </ul>
                <p>
                    The site does not track users, does not display adverts and
                    does not make any money from affiliate schemes or links,
                    etc.
                </p>

                <h2>How can I help?</h2>
                <p>
                    If you know a great social group in Bristol which is open to
                    newcomers, please do suggest it to be added to the site{' '}
                    <Link url="/add-group">on the following page</Link>.
                </p>
                <p>
                    If you have feedback or suggestions for the site, please{' '}
                    <Link url="/feedback">use this form</Link>.
                </p>
                <p>
                    As a developer, you can leave suggestions and feedback on
                    this sites{' '}
                    <Link
                        url="https://github.com/jhancock532/social-bristol/issues/new"
                        external
                    >
                        GitHub repository
                    </Link>
                    . Pull requests and other code contributions are welcome!
                </p>
                <h2>Contributors</h2>
                <ul>
                    <li>
                        Web development:{' '}
                        <Link
                            url="https://www.linkedin.com/in/james-hancock-52464a119/"
                            external
                        >
                            James Hancock
                        </Link>
                    </li>
                    <li>Google Forms inspiration: Chris Ward</li>
                    <li>
                        <Link url="https://tabb.cc/events" external>
                            Film meetup groups
                        </Link>{' '}
                        hosted and provided by{' '}
                        <Link url="https://tabb.cc" external>
                            Tabb
                        </Link>
                    </li>
                </ul>
            </div>
        </Layout>
    );
}
