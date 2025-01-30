import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import style from './BasePageLayout.module.scss';
import { usePageHeader } from "../hooks";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function PageHeader() {
  const { title, additionalItems } = usePageHeader();
  if (title && title !== "") {
    return (
      <div className="flex items-center space-x-2">
        <h2 className="text-3xl font-semibold">{title}</h2>
        {additionalItems && <div>{additionalItems}</div>}
      </div>
    );
  }
  return <div></div>;
}

// #region Page Actions Context

export const PageActionsContext = createContext({
  actions: <></>,
  setActions: (() => <></>) as React.Dispatch<
    React.SetStateAction<JSX.Element>
  >,
});

export function PageContextActions() {
  const actionsContext = useContext(PageActionsContext);
  return <>{actionsContext.actions}</>;
}

export function usePageActions(
  component: false | JSX.Element | null,
  deps: any[] = []
) {
  let actionsContext = useContext(PageActionsContext);

  return useEffect(() => {
      actionsContext.setActions(component || <></>);
  }, [...deps]);
}

// #endregion

interface BasePageLayoutProps extends React.PropsWithChildren {
  className?: string;
}

export function BasePageLayout({ children }: Readonly<BasePageLayoutProps>) {
  const [actions, setActions] = useState(<></>);
  const location = useLocation();
  const path = location.pathname;
  const toggleSidebar = () => {

  };

  // Reset actions when location changes
  useEffect(() => {
    return () => setActions(() => {
      return <div></div>;
    });
  }, [path]);

  return (
    <PageActionsContext.Provider
      value={useMemo(() => ({ actions, setActions }), [actions, setActions])}
    >
      <div className={`${style.pageHeader}`}>
        <div className={`flex items-center justify-between container mx-auto h-full p-[2rem]`}>
          <div className="flex items-center">
            <button
                className="md:hidden mr-6"
                onClick={toggleSidebar}
              >
              <FaBars />
            </button>
            <PageHeader />
          </div>
          {actions}
        </div>
      </div>
      <article className={`${style.pageContent} container mx-auto`}>
        {children}
      </article>
    </PageActionsContext.Provider>
  );
}

export default BasePageLayout;
