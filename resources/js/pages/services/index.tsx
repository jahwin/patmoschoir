import React from 'react';
import Header from "@/components/shared/Header";
import ServicesHero from "./components/ServicesHero";
import ServicesGrid from "./components/ServicesGrid";
import ServicesProcess from "./components/ServicesProcess";
import ServicesCTA from "./components/ServicesCTA";
import Footer from "@/components/shared/Footer";
import styles from "./style.module.scss";
import PublicLayout from '@/components/layouts/public-layout';
import { Head } from '@inertiajs/react';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  inclusions: string;
  text: string | null;
  created_at: string;
  updated_at: string;
}

interface ServicesPageSettings {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  backgroundImage?: string | null;
}

interface ServicesPageProps {
  services: Service[];
  servicesPageSettings?: ServicesPageSettings | null;
}

export default function Services({ services, servicesPageSettings }: ServicesPageProps) {
  // Use admin settings with fallback to default values
  const title = servicesPageSettings?.title || "Our Ministry";
  const subtitle = servicesPageSettings?.subtitle || "Comprehensive Architectural Solutions";
  const description = servicesPageSettings?.description || "From concept to completion, we offer a full range of architectural services designed to bring your vision to life. Our expertise spans residential, commercial, and sustainable design solutions.";
  const backgroundImage = servicesPageSettings?.backgroundImage || undefined;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PublicLayout
        title={title}
        subtitle={subtitle}
        description={description}
        backgroundImage={backgroundImage}
      >
        <div className={styles.servicesPage}>
          <ServicesGrid services={services} />
          {/* <ServicesProcess /> */}
          <ServicesCTA />
        </div>
      </PublicLayout>
    </>
  );
}
