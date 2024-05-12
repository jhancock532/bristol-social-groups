import React from 'react';
import Link from '@/components/Link';
import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.container}>
            <div></div>
            <div>
                <p className={styles.description}>
                    This website is{' '}
                    <Link url="/about" className={styles.link}>
                        a volunteer run initiative
                    </Link>{' '}
                    in early development.
                    <br />
                    If you&apos;d like to leave feedback,{' '}
                    <Link url="/feedback" className={styles.link}>
                        please use this form
                    </Link>
                    .<br />
                    You can also suggest a group to be added to the site{' '}
                    <Link url="/add-group" className={styles.link}>
                        on this page
                    </Link>
                    .
                    <br /> <br />
                    The website is open source,{' '}
                    <Link
                        url="https://github.com/jhancock532/social-bristol/"
                        external
                        className={styles.link}
                    >
                        with code shared on GitHub.
                    </Link>
                    <br />
                    Pull requests and issues welcome.
                </p>
            </div>
            <div></div>
        </footer>
    );
};
