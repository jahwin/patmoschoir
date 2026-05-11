import React from 'react';
import NewsCard from '@/components/shared/NewsCard';
import styles from './NewsGrid.module.scss';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  slug: string;
  featured: boolean;
}

interface NewsGridProps {
  posts: BlogPost[];
  className?: string;
}

export default function NewsGrid({ posts, className = "" }: NewsGridProps) {
  return (
    <section className={`${styles.newsGrid} ${className}`}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {posts.map((post) => (
            <NewsCard 
              key={post.id} 
              post={post}
              showShare={true}
            />
          ))}
        </div>

      </div>
    </section>
  );
}