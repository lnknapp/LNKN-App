import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface PageHeaderContextProps {
  title: string;
  additionalItems?: JSX.Element | null;
  setHeader: (title: string, additionalItems?: JSX.Element | null) => void;
}

const PageHeaderContext = createContext<PageHeaderContextProps | undefined>(undefined);

export const usePageHeader = () => {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error("usePageHeader must be used within a PageHeaderProvider");
  }
  return context;
};

export const PageHeaderProvider = ({ children }: PropsWithChildren) => {
  const [title, setTitle] = useState<string>("");
  const [additionalItems, setAdditionalItems] = useState<JSX.Element | null>(null);

  const setHeader = (title: string, additionalItems?: JSX.Element | null) => {
    setTitle(title);
    setAdditionalItems(additionalItems || null);
  };

  return (
    <PageHeaderContext.Provider value={{ title, additionalItems, setHeader }}>
      {children}
    </PageHeaderContext.Provider>
  );
};

export function useSetPageHeader(title: string, additionalItems?: JSX.Element | null, dependencies: any[] = []) {
  const { setHeader } = usePageHeader();

  useEffect(() => {
    setHeader(title, additionalItems);
  }, [title, additionalItems, setHeader, ...dependencies]);
}
