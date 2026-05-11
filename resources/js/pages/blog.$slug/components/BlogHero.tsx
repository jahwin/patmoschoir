import React from 'react';
import styles from './BlogHero.module.scss';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

interface BlogHeroProps {
  post: BlogPost;
  className?: string;
}

export default function BlogHero({ post, className = "" }: BlogHeroProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className={`${styles.blogHero} ${className}`}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <img
          src={post.image}
          alt={post.title}
          className={styles.heroImage}
        />
        <div className={styles.backgroundOverlay}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <div className={styles.postMeta}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.readTime}>{post.readTime} read</span>
            </div>
            
            <h1 className={styles.headline}>
              {post.title}
            </h1>
            
            <p className={styles.excerpt}>
              {post.excerpt}
            </p>

            <div className={styles.authorInfo}>
              <div className={styles.authorAvatar}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className={styles.authorDetails}>
                <span className={styles.authorName}>{post.author}</span>
                <span className={styles.publishDate}>{formatDate(post.date)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbNav}>
            <a href="/kalisimbi" className={styles.breadcrumbLink}>Home</a>
            <span className={styles.breadcrumbSeparator}>/</span>
            <a href="/news" className={styles.breadcrumbLink}>News</a>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Article</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
