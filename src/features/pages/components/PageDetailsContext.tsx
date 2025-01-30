import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Page } from '../../../data/entities/pages';
import { UserInfo } from '../../../models';
import { UserService } from '../../../services';

interface PageDetailsContextProps {
  page: Page;
  user: UserInfo | null;
  setPage: (page: Page) => void;
  updatePageKey: (key: keyof Page, value: any) => void;
}

interface PageDetailsProviderProps {
  children: ReactNode;
  initialPage: Page;
}

const PageDetailsContext = createContext<PageDetailsContextProps | undefined>(undefined);

export const PageDetailsProvider: React.FC<PageDetailsProviderProps> = ({ children, initialPage }) => {
  const [page, setPage] = useState<Page>(initialPage);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await UserService.getUserInfo();
      if (userInfo)
        setUser(userInfo);
    };

    fetchUser();
  }, [page]);

  const updatePageKey = (key: keyof Page, value: any) => {
    setPage((prevPage) => {
      const updatedPage = { ...prevPage, [key]: value };
      return updatedPage;
    });
  };

  return (
    <PageDetailsContext.Provider value={{ page, user, setPage, updatePageKey }}>
      {children}
    </PageDetailsContext.Provider>
  );
};

export const usePageDetails = () => {
  const context = useContext(PageDetailsContext);
  if (!context) {
    throw new Error('usePageDetails must be used within a PageDetailsProvider');
  }
  return context;
};
