import React, { useState } from 'react';
import styles from './NewsFilter.module.scss';

interface NewsFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export default function NewsFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  className = "" 
}: NewsFilterProps) {
  return (
    <section className={`${styles.newsFilter} ${className}`}>
      <div className={styles.container}>
        <div className={styles.filterWrapper}>
          <h3 className={styles.filterTitle}>Filter by Category</h3>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => onCategoryChange('all')}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
