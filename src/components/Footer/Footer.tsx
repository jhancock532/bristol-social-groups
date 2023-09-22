import React from 'react';

import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.container}>
            <div></div>
            <div>
                <p className={styles.description}>
                    This website is currently in development.
                </p>
                <a
                    href="https://github.com/jhancock532?tab=repositories"
                    className={styles.link}
                >
                    Contributions welcome.
                </a>
            </div>
            <div></div>
        </footer>
    );
};
