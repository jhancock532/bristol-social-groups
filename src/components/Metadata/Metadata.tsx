import React from 'react';
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
        </Head>
    );
};

export default Metadata;
