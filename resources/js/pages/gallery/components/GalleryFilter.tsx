import React from 'react';
import styles from './GalleryFilter.module.scss';

interface GalleryFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export default function GalleryFilter({ 
  activeFilter, 
  onFilterChange, 
  className = "" 
}: GalleryFilterProps) {
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'interior', label: 'Interior Design' },
    { id: 'urban', label: 'Urban Design' },
    { id: 'sustainable', label: 'Sustainable' }
  ];

  return (
    <section className={`${styles.galleryFilter} ${className}`}>
      <div className={styles.container}>
        <div className={styles.filterContent}>
          <h2 className={styles.filterTitle}>Filter Projects</h2>
          <div className={styles.filterButtons}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`${styles.filterButton} ${
                  activeFilter === filter.id ? styles.active : ''
                }`}
                onClick={() => onFilterChange(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
