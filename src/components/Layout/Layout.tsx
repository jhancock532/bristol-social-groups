import styles from './Layout.module.scss';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}></div>
            <main className={styles.content}>{children}</main>
            <div className={styles.sidebar}></div>
        </div>
    );
};

export default Layout;
