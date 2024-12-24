import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface PageTitleContextProps {
  title: string;
  setTitle: (title: string) => void;
}

const PageTitleContext = createContext<PageTitleContextProps | undefined>(undefined);

export const usePageTitle = () => {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error("usePageTitle must be used within a PageTitleProvider");
  }
  return context;
};

export const PageTitleProvider = ( { children } : PropsWithChildren) => {
  const [title, setTitle] = useState<string>("");

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export function useSetPageTitle(title: string, dependencies: any[] = []) {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle(title);
  }, [title ,setTitle, ...dependencies]);
}

