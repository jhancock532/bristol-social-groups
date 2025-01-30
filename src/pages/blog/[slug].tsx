import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import Head from 'next/head';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHTML';
import { Post } from '../../types/Post';
import styles from './Blog.module.scss';

type Props = {
    post: Post;
    content: string;
};

export default function BlogPost({ post, content }: Props) {
    return (
        <Layout>
            <Metadata
                title={`${post.title} | Bristol Social Groups`}
                description={post.excerpt}
            />
            <Head>
                <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <main>
                <div className={styles.header}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.meta}>
                        <div className={styles.author}>
                            <img
                                src={post.author.picture}
                                alt={post.author.name}
                            />
                            <span>{post.author.name}</span>
                        </div>
                        <time>
                            {new Date(post.date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                            })}
                        </time>
                    </div>
                </div>
                {post.coverImage && (
                    <div className={styles.coverImage}>
                        <img src={post.coverImage} alt={post.title} />
                    </div>
                )}
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </main>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const post = getPostBySlug(params?.slug as string);

    if (!post) {
        return {
            notFound: true,
        };
    }

    const content = await markdownToHtml(post.content || '');

    return {
        props: {
            post,
            content,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getAllPosts();

    return {
        paths: posts.map((post) => ({
            params: {
                slug: post.slug,
            },
        })),
        fallback: false,
    };
};
