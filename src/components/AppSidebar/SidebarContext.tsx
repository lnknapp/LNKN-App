import React, { createContext, useContext, useState } from "react";

interface SidebarContextProps {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});

export const SidebarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen, toggle: () => setIsOpen(o => !o), close: () => setIsOpen(false) }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
