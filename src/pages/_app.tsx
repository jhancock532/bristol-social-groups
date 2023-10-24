import '@/styles/globals.scss';
import { Rubik } from 'next/font/google';
import type { AppProps } from 'next/app';

export const rubik = Rubik({
    subsets: ['latin'],
    display: 'swap',
    adjustFontFallback: false,
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={rubik.className}>
            <Component {...pageProps} />
        </div>
    );
}
