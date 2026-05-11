import React, { createContext, useContext, useState, ReactNode } from 'react';
import JoinMinistryModal from '@/components/modal/JoinMinistryModal';

interface JoinMinistryModalContextType {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const JoinMinistryModalContext = createContext<JoinMinistryModalContextType | undefined>(undefined);

export function JoinMinistryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <JoinMinistryModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <JoinMinistryModal showModal={isOpen} setShowModal={setIsOpen} />
    </JoinMinistryModalContext.Provider>
  );
}

export function useJoinMinistryModal() {
  const context = useContext(JoinMinistryModalContext);
  if (context === undefined) {
    throw new Error('useJoinMinistryModal must be used within a JoinMinistryModalProvider');
  }
  return context;
}
