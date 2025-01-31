import Link from 'next/link';
import { Post } from '@/types/Post';
import styles from './BlogPostCard.module.scss';

type Props = {
    post: Post;
};

export default function BlogPostCard({ post }: Props) {
    return (
        <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
            <article className={styles.card}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{post.title}</h2>
                    <div className={styles.meta}>
                        <div className={styles.author}>
                            <img
                                src={post.author.picture}
                                alt={post.author.name}
                                className={styles.authorImage}
                            />
                            <span className={styles.authorName}>
                                {post.author.name}
                            </span>
                        </div>
                        <time className={styles.date}>
                            {new Date(post.date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </time>
                    </div>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                </div>
            </article>
        </Link>
    );
}
