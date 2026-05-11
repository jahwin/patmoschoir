import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './ProjectsSection.module.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectsSectionProps {
  className?: string;
}

export default function ProjectsSection({ className = "" }: ProjectsSectionProps) {
  const projects = [
    {
      id: 1,
      title: "COTTON HOUSE",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
      alt: "Cotton House - Contemporary residential building"
    },
    {
      id: 2,
      title: "ARMADA CENTER",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Armada Center - Modern building with curved facade"
    },
    {
      id: 3,
      title: "URBAN TOWER",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      alt: "Urban Tower - Modern office complex"
    },
    {
      id: 4,
      title: "GREEN PLAZA",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Green Plaza - Sustainable mixed-use development"
    }
  ];

  return (
    <section className={`${styles.projectsSection} ${className}`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>OUR PROJECTS</h2>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: `.${styles.swiperButtonNext}`,
            prevEl: `.${styles.swiperButtonPrev}`,
          }}
          pagination={{
            el: `.${styles.swiperPagination}`,
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={600}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
          }}
          className={styles.projectsSwiper}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id} className={styles.projectSlide}>
              <div className={styles.projectCard}>
                <div className={styles.projectImageContainer}>
                  <img
                    src={project.image}
                    alt={project.alt}
                    className={styles.projectImage}
                  />
                  <div className={styles.projectOverlay}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Controls */}
        <div className={styles.navigationControls}>
          <button className={`${styles.navButton} ${styles.swiperButtonPrev}`} aria-label="Previous projects">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button className={`${styles.navButton} ${styles.swiperButtonNext}`} aria-label="Next projects">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>

        {/* Custom Pagination */}
        <div className={`${styles.swiperPagination} ${styles.customPagination}`}></div>
      </div>
    </section>
  );
}
