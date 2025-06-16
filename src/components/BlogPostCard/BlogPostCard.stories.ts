import type { Meta, StoryObj } from '@storybook/nextjs';
import BlogPostCard from './BlogPostCard';

const MOCK_POST = {
    slug: 'example-blog-post',
    title: 'Example Blog Post Title',
    date: '2025-01-31T12:00:00Z',
    coverImage: 'images/hot-air-balloon-one.svg',
    author: {
        name: 'Jules Verne',
        picture: 'images/hot-air-balloon-one.svg',
    },
    excerpt:
        'This is an example blog post excerpt that showcases how the card component displays preview text for blog articles.',
    ogImage: {
        url: 'images/hot-air-balloon-one.svg',
    },
    content: 'Full content of the blog post...',
};

const meta = {
    title: 'Components/Cards/BlogPostCard',
    component: BlogPostCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        post: { control: 'object' },
    },
} satisfies Meta<typeof BlogPostCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        post: MOCK_POST,
    },
};
