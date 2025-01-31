import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { Post } from '../types/Post';

const postsDirectory = join(process.cwd(), 'blog');

/**
 * Gets array of all blog post slugs from the posts directory
 * @returns {string[]} Array of blog post slugs
 */
export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

/**
 * Gets a single blog post by its slug
 * @param {string} slug - The slug of the blog post to retrieve
 * @returns {Post} The blog post data and content
 */
export function getPostBySlug(slug: string) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Ensure date is converted to ISO string if it's a Date object
    // TODO: This feels like a hack to work around an issue with PagesCMS
    // Maybe updating Next.js will resolve this issue, or the CMS config file.
    const date =
        data.date instanceof Date ? data.date.toISOString() : data.date;

    return { ...data, date, slug: realSlug, content } as Post;
}

/**
 * Gets all blog posts sorted by date
 * @returns {Post[]} Array of all blog posts sorted by date descending
 */
export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
