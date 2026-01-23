import BlogCard from './BlogCard.astro';

export default {
    title: 'Components/BlogCard',
    component: BlogCard,
    tags: ['autodocs'],
    argTypes: {
        post: { control: 'object' },
    },
};

const mockPost = {
    id: 'hello-world',
    slug: 'hello-world',
    body: '',
    collection: 'blog',
    data: {
        title: 'Hello World - 這是第一篇文章',
        description: '這是一篇測試文章的描述，用於展示 BlogCard 元件的樣式與排版效果。',
        pubDate: new Date('2024-01-01'),
        image: {
            url: 'https://placehold.co/600x400',
            alt: 'Placeholder Image',
        },
        tags: ['Learning', 'Astro'],
    },
};

export const Default = {
    args: {
        post: mockPost,
    },
};

export const NoImage = {
    args: {
        post: {
            ...mockPost,
            data: {
                ...mockPost.data,
                image: undefined,
            },
        },
    },
};
