import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import Link from '@/components/Link';
import styles from './More.module.scss';

export default function AddGroup() {
    return (
        <Layout>
            <Metadata
                title="Bristol Social Groups - Add group"
                description="Recommend a group to be added to the site."
            />
            <h1 className={styles.title}>Add group</h1>
            <p className={styles.description}>
                Here you can complete a form to recommend a group not yet listed
                on the site. Use the embed below or{' '}
                <Link url="https://forms.gle/9JzgPSfnEB4mkbPu6" external>
                    complete the form in a new tab.
                </Link>
            </p>
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfSRR7lAjU27d_yt12BzwfUKSE6IM_wDexfld45teo60tgXRQ/viewform?embedded=true"
                width="100%"
                height="960"
                frameBorder="0"
                title="Bristol Social Groups group submission form"
            >
                Form loading…
            </iframe>
        </Layout>
    );
}
