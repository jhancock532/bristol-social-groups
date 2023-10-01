import React from 'react';

import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.container}>
            <div></div>
            <div>
                <p className={styles.description}>
                    This website is currently in development. Thank you for
                    visiting!
                </p>
                <a
                    href="https://github.com/jhancock532/social-bristol/issues/new"
                    className={styles.link}
                >
                    Feedback, social groups & code contributions welcome.{' '}
                </a>
            </div>
            <div></div>
        </footer>
    );
};
