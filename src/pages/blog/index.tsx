import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import BlogPostCard from '@/components/BlogPostCard';
import { getAllPosts } from '@/lib/api';
import { Post } from '@/types/Post';
import styles from './Blog.module.scss';

type Props = {
    posts: Post[];
};

export default function BlogIndex({ posts }: Props) {
    return (
        <Layout>
            <Metadata
                title="Blog | Bristol Social Groups"
                description="Latest blog posts from Bristol Social Groups"
            />
            <main>
                <h1 className={styles.title}>Blog Posts</h1>
                <div className={styles.blogLinks}>
                    {posts.map((post) => (
                        <BlogPostCard key={post.slug} post={post} />
                    ))}
                </div>
            </main>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const posts = getAllPosts();

    return {
        props: {
            posts: posts.sort(
                (post1, post2) =>
                    new Date(post2.date).getTime() -
                    new Date(post1.date).getTime(),
            ),
        },
    };
};
