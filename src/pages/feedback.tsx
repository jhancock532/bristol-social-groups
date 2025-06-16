import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import Link from '@/components/Link';
import styles from './More.module.scss';

export default function Feedback() {
    return (
        <Layout>
            <Metadata
                title="Bristol Social - Feedback"
                description="Provide feedback or suggestions for the website."
            />
            <h1 className={styles.title}>Feedback</h1>
            <p className={styles.description}>
                Any feedback or suggestions you have for the website are greatly
                appreciated. Use the embed below or{' '}
                <Link url="https://forms.gle/ZGKkVqnQTQcBUnMe9" external>
                    complete the form in a new tab.
                </Link>
            </p>
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeZRjw4eBDCZhujAbPtx2ZREGGI1jDb6-3pk5Df1VQRG4Pkyw/viewform?embedded=true"
                width="100%"
                height="600"
                frameBorder="0"
                title="Bristol Social feedback submission form"
            >
                Form loading…
            </iframe>
        </Layout>
    );
}
