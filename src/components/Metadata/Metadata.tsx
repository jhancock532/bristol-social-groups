import Head from 'next/head';

type MetadataProps = {
    title: string;
    description: string;
};

const Metadata = ({ title, description }: MetadataProps) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin=""
            />
        </Head>
    );
};

export default Metadata;
