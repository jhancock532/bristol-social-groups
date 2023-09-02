import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import fs from 'fs';
import { join } from 'path';
import { getDirectories } from '@/utils/utils';

const EVENTS_PATH = join(process.cwd(), 'data/events/');

const Post = ({ data }: { data: any }) => {
    return (
        <Layout>
            <Metadata title={data.name} description={data.description} />
            <h2>{data.name}</h2>
            <div>{data.description}</div>
        </Layout>
    );
};

export const getStaticPaths = async () => {
    const paths: any[] = [];

    getDirectories(EVENTS_PATH).forEach((event) => {
        paths.push({
            params: { slug: event },
        });
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const eventFilePath = join(EVENTS_PATH, `${params.slug}/details.json`);
    const data = JSON.parse(
        fs.readFileSync(eventFilePath, { encoding: 'utf8' }),
    );

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { data },
    };
};

export default Post;
