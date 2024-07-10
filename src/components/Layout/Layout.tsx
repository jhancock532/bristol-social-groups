import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import styles from './Layout.module.scss';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.mainContainer}>
                <div className={styles.sidebar}></div>
                <main className={styles.content}>{children}</main>
                <div className={styles.sidebar}></div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
