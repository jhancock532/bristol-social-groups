import React from 'react';
import Link from '@/components/Link';
import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.container}>
            <div></div>
            <div className={styles.description}>
                <p>
                    <strong>Thank you for visiting!</strong>
                </p>
                <p>
                    This website is a non-profit, volunteer run initiative.
                    <br />
                    <Link url="/feedback" className={styles.link}>
                    Leave feedback here
                    </Link>{' '}
                    or send an email to{' '}
                    <Link url="mailto:contact@bristol.social" className={styles.link}>
                        contact@bristol.social
                    </Link>
                    .
                </p>
            </div>
            <div></div>
        </footer>
    );
};
