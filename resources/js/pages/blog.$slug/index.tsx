import React from 'react';
import BlogHero from "./components/BlogHero";
import BlogContent from "./components/BlogContent";
import RelatedPosts from "./components/RelatedPosts";
import Footer from "@/components/shared/Footer";
import styles from "./style.module.scss";
import PublicLayout from '@/components/layouts/public-layout';
import { BlogPost } from '../news';
import { Head } from '@inertiajs/react';

interface BlogDetailProps {
  slug: string;
  blog: BlogPostDetail;
  otherBlogs: BlogPost[];
}

interface BlogPostDetail {
  id: number;
  content: string;
  created_at: string;
  image: string;
  read_time: string;
  slug: string;
  tags: string[];
  word_count: number;
  author: string | null;
  title: string;
  updated_at: string;
}

interface BlogDetailPageProps {
  blog: BlogPostDetail;
}

export default function BlogDetail({ slug, blog, otherBlogs }: BlogDetailProps) {

  return (
    <>
      <Head title={blog.title} />
      <PublicLayout staticHeader={true}>
        <div className={styles.blogDetailPage}>
          {/* Blog Hero Section with Cover Image */}
          <section className={styles.blogHero}>
            <div className={styles.heroContainer}>
              <div className={styles.heroImageContainer}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className={styles.heroImage}
                />
              </div>
              <div className={styles.heroTextContent}>
                <h1 className={styles.heroTitle}>{blog.title}</h1>
                <div className={styles.heroMeta}>
                  <span className={styles.author}>By {blog.author || 'Admin'}</span>
                  <span className={styles.date}>{new Date(blog.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  <span className={styles.readTime}>{blog.read_time} min read</span>
                </div>
              </div>
            </div>
          </section>

          <BlogContent content={blog.content} tags={blog.tags} />
          <RelatedPosts posts={otherBlogs} />
        </div>
      </PublicLayout>
    </>
  );
}
