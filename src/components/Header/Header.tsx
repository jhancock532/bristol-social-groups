import React, { useState } from 'react';
import Link from 'next/link';

import styles from './Header.module.scss';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.container}>
            <div></div>
            <div>
                <nav
                    className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
                >
                    <button
                        className={styles.menuButton}
                        onClick={toggleMenu}
                        aria-label="Close menu"
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Close Menu
                    </button>
                    <ul>
                        <li className={styles.navItem}>
                            <Link href="/" className={styles.link}>
                                Home
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/about" className={styles.link}>
                                About
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link
                                href="/more-resources"
                                className={styles.link}
                            >
                                More resources
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/add-group" className={styles.link}>
                                Add a group
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button
                    className={styles.menuButton}
                    onClick={toggleMenu}
                    aria-label="Open menu"
                >
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 12H21"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3 6H21"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3 18H21"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Menu
                </button>
            </div>
            <div></div>
        </header>
    );
};
