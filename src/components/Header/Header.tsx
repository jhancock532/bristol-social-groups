import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import styles from './Header.module.scss';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null); // Reference for the menu
    const closeButtonRef = useRef<HTMLButtonElement | null>(null); // Reference for the close button
    const firstFocusableElementRef = useRef(null); // First focusable element in the menu

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Handle trapping focus
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isMenuOpen) {
                const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>('a, button') || [];
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.key === 'Tab') {
                    // Shift + Tab (backward)
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus(); // Loop focus to last element
                    }
                    // Tab (forward)
                    else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus(); // Loop focus to first element
                    }
                } else if (e.key === 'Escape') {
                    // Close menu on Escape key
                    setIsMenuOpen(false);
                }
            }
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Focus on the close button when menu opens
            closeButtonRef.current?.focus();
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMenuOpen]);
    return (
        <header className={styles.container}>
            <div></div>
            <div>
                <nav
                    className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''
                        }`}
                    ref={menuRef}
                    aria-hidden={!isMenuOpen}
                >
                    <button
                        ref={closeButtonRef}
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
                            <Link
                                href="/"
                                className={styles.link}
                                ref={firstFocusableElementRef} // First focusable element
                            >
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
                            <Link href="/add-a-group" className={styles.link}>
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
};;
