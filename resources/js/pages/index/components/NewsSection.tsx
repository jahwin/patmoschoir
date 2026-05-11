import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import NewsCard from '@/components/shared/NewsCard';
import styles from './NewsSection.module.scss';
import { SharedData } from '@/types/shared';

interface BlogPost {
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

interface NewsSectionProps {
  blogs: BlogPost[];
  className?: string;
}

export default function NewsSection({ blogs, className = "" }: NewsSectionProps) {
  const { siteContent } = usePage<SharedData>().props;
  const backgroundImage = siteContent?.home_news_background_image;
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.85)), url(${backgroundImage})`,
      }
    : undefined;

  // Transform BlogPost data to match NewsCard interface
  const transformedBlogs = blogs.map(blog => ({
    id: blog.id,
    title: blog.title,
    excerpt: blog.content ? blog.content.substring(0, 150) + '...' : '',
    content: blog.content,
    author: blog.author || 'Admin',
    date: blog.created_at,
    category: blog.tags ? blog.tags.split(',')[0].trim() : 'General',
    image: blog.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    readTime: blog.read_time,
    featured: false,
    slug: blog.slug
  }));

  return (
    <section
      className={`${styles.newsSection} ${backgroundImage ? styles.sectionWithBackground : ''} ${className}`}
      style={backgroundStyle}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>CURRENT NEWS</h2>
          <p className={styles.sectionDescription}>
            Stay updated with our latest insights and architectural innovations.
          </p>
        </div>
        
        <div className={styles.newsGrid}>
          {transformedBlogs.map((blog) => (
            <NewsCard 
              key={blog.id} 
              post={blog}
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
