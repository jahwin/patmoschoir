import React from 'react';
import NewsCard from '@/components/shared/NewsCard';
import styles from './RelatedPosts.module.scss';
import { BlogPost } from '@/pages/news';
import { Link } from '@inertiajs/react';

interface RelatedBlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  tags: string | null;
  read_time: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}

interface RelatedPostsProps {
  posts: BlogPost[];
  className?: string;
}

export default function RelatedPosts({ posts, className = "" }: RelatedPostsProps) {
  // Transform BlogPost data to match NewsCard interface
  const transformedPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.content ? post.content.substring(0, 150) + '...' : '',
    content: post.content,
    author: post.author || 'Admin',
    date: post.created_at,
    category: post.tags ? post.tags.split(',')[0].trim() : 'General',
    image: post.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    readTime: post.read_time,
    featured: false,
    slug: post.slug
  }));

  return (
    <section className={`${styles.relatedPosts} ${className}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Related Articles</h2>
          <p className={styles.sectionDescription}>
            Continue exploring our latest insights and architectural innovations.
          </p>
        </div>

        <div className={styles.postsGrid}>
          {transformedPosts.map((post) => (
            <NewsCard 
              key={post.id} 
              post={post}
              showShare={true}
            />
          ))}
        </div>

        <div className={styles.viewAllSection}>
          <Link href="/news" className={styles.viewAllButton}>
            View All Articles
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
