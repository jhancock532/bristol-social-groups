import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import Link from '@/components/Link';
import styles from './More.module.scss';

export default function AddGroup() {
    return (
        <Layout>
            <Metadata
                title="Social Bristol - Add group"
                description="Recommend a group to be added to the site."
            />
            <h1 className={styles.title}>Add group</h1>
            <p className={styles.description}>
                Here you can complete a form to recommend a group not yet listed
                on the site. Use the embed below or{' '}
                <Link url="https://forms.gle/wB5zmHL6tLZam15Z9" external>
                    complete the form in a new tab.
                </Link>
            </p>
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfq1L4wFFhRPox4o9BYGPtkmN503Kul9PDRRzjpiKBF8EDpZg/viewform?embedded=true"
                width="100%"
                height="4260"
                frameBorder="0"
                title="Social Bristol group submission form"
            >
                Form loading…
            </iframe>
        </Layout>
    );
}
