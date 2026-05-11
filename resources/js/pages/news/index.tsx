import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from "@/components/shared/Header";
import NewsHero from "./components/NewsHero";
import NewsFilter from "./components/NewsFilter";
import NewsGrid from "./components/NewsGrid";
import NewsCTA from "./components/NewsCTA";
import Footer from "@/components/shared/Footer";
import styles from "./style.module.scss";
import PublicLayout from '@/components/layouts/public-layout';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  tags: string | null;
  read_time: string;
  word_count: number;
  author: string | null;
  created_at: string;
  updated_at: string;
}

interface NewsPageProps {
  blogs: BlogPost[];
}

export default function News({ blogs }: NewsPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Extract unique categories from tags
  const categories = ['all', ...Array.from(new Set(
    blogs
      .filter(blog => blog.tags)
      .flatMap(blog => blog.tags?.split(',').map(tag => tag.trim()) || [])
  ))];

  // Transform blogs to match the expected format
  const blogPosts = blogs.map(blog => ({
    id: blog.id,
    title: blog.title,
    excerpt: blog.content ? blog.content.substring(0, 150) + '...' : '',
    content: blog.content,
    author: blog.author || 'Admin',
    date: new Date(blog.created_at).toISOString().split('T')[0],
    category: blog.tags ? blog.tags.split(',')[0].trim() : 'General',
    image: blog.image || '',
    readTime: blog.read_time,
    featured: false, // You can add a featured field to your model if needed
    slug: blog.slug
  }));

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <>
      <Head title="News & Insights" />
      <PublicLayout title="News & Insights" subtitle="Stay Updated with Latest Insights" description="Discover the latest trends in architecture, design innovations, project showcases, and industry insights from our expert team.">
        <div className={styles.newsPage}>
          <NewsGrid posts={filteredPosts} />
          <NewsCTA />
        </div>
      </PublicLayout>
    </>
  );
}
