import React from 'react';
import Link from '@/components/Link';
import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <div className={styles.fullPageWrapper}>
            <footer className={styles.container}>
                <div></div>
                <div className={styles.description}>
                    <p>
                        <strong>Thank you for visiting!</strong>
                    </p>
                    <p>
                        This website is a non-profit, volunteer run initiative.{' '}
                        <Link url="/feedback" className={styles.link}>
                            Leave feedback here
                        </Link>{' '}
                        and follow us on your favourite social media platform
                        for updates.
                    </p>
                    <p>
                        <Link
                            url="https://bsky.app/profile/bristol.social"
                            className={styles.link}
                        >
                            BlueSky
                        </Link>{' '}
                        -{' '}
                        <Link
                            url="https://www.facebook.com/profile.php?id=61571434642804"
                            className={styles.link}
                        >
                            Facebook
                        </Link>{' '}
                        -{' '}
                        <Link
                            url="https://www.instagram.com/bristol.social/"
                            className={styles.link}
                        >
                            Instagram
                        </Link>{' '}
                        -{' '}
                        <Link
                            url="https://www.threads.net/@bristol.social"
                            className={styles.link}
                        >
                            Threads
                        </Link>{' '}
                        -{' '}
                        <Link
                            url="https://x.com/bristol_groups"
                            className={styles.link}
                        >
                            X
                        </Link>
                    </p>
                </div>
                <div></div>
            </footer>
        </div>
    );
};
