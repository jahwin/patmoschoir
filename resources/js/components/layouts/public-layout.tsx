import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { type ReactNode } from 'react';
import BreadCrumb from '@/components/shared/BreadCrumb';
import styles from '@/components/shared/Header.module.scss';
import { JoinMinistryModalProvider, useJoinMinistryModal } from '@/contexts/JoinMinistryModalContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '../shared/Navbar';

interface PublicLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  staticHeader?: boolean;
  tags?: {
    label: string;
  }[];
  backgroundImage?: string;
}

function PublicLayoutContent({ children, title, subtitle, description, staticHeader = false, tags = [], backgroundImage = '', ...props }: PublicLayoutProps) {
  const { openModal } = useJoinMinistryModal();

  return (
    <>
      {/* <Header
        className={staticHeader ? styles.static : ''}
        onOpenJoinMinistryModal={openModal}
      /> */}
      <Navbar 
        setJoinMinistryOpen={openModal}
      />
      {
        title && (
          <BreadCrumb title={title} subtitle={subtitle} description={description} tags={tags} backgroundImage={backgroundImage} />
        )
      }
      {children}
      <Footer />
    </>
  );
}

export default function PublicLayout(props: PublicLayoutProps) {
  return (
    <ThemeProvider>
      <JoinMinistryModalProvider>
        <PublicLayoutContent {...props} />
      </JoinMinistryModalProvider>
    </ThemeProvider>
  );
}
