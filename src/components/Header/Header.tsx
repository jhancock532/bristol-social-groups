import React from 'react';
import Link from 'next/link';

import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.container}>
            <div></div>
            <div>
                <ul className={styles.nav}>
                    <li className={styles.navItem}>
                        <Link href="/" className={styles.link}>
                            Home
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/map" className={styles.link}>
                            Map
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/about" className={styles.link}>
                            About
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/more-resources" className={styles.link}>
                            More resources
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/add-group" className={styles.link}>
                            Add group
                        </Link>
                    </li>
                </ul>
            </div>
            <div></div>
        </header>
    );
};
