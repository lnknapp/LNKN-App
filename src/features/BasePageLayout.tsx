import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import style from './BasePageLayout.module.scss';
import { usePageTitle } from "../hooks";
import { useLocation } from "react-router-dom";

function PageTitle() {
  const { title } = usePageTitle();
  if (title && title !== "") {
    return <h2 className="text-3xl font-semibold m-0">{title}</h2>;
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

  // Reset actions when location changes
  useEffect(() => {
    return () => setActions(() => {
      return <></>;
    });
  }, [path]);

  return (
    <PageActionsContext.Provider
      value={useMemo(() => ({ actions, setActions }), [actions, setActions])}
    >
      <div className={`${style.pageHeader}`}>
        <PageTitle />
        {actions}
      </div>
      <article className={`${style.pageContent}`}>
        {children}
      </article>
    </PageActionsContext.Provider>
  );
}

export default BasePageLayout;
