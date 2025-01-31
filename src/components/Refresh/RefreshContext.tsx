import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RefreshContextProps {
  refreshTrigger: boolean;
  setRefreshTrigger: (value: boolean) => void;
}

const RefreshContext = createContext<RefreshContextProps | undefined>(undefined);

export const RefreshProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  return (
    <RefreshContext.Provider value={{ refreshTrigger, setRefreshTrigger }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
};
