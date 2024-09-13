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
                    If you&apos;d like to leave feedback,{' '}
                    <Link url="/feedback" className={styles.link}>
                        please use this form
                    </Link>
                    .
                </p>
            </div>
            <div></div>
        </footer>
    );
};
