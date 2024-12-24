import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

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
  }, [actionsContext, component, ...deps]);
}

// #endregion

function PageTitle(props: any) {
  if (props.title && props.title !== "") {
    return <h2>{props.title}</h2>;
  }
  return null;
}


interface PageLayoutProps extends React.PropsWithChildren {
  title?: string;
  topbar?: React.ReactElement;
  sidebar?: React.ReactElement;
  className?: string;
}

export function PageLayout({title, topbar, sidebar, children, className}: Readonly<PageLayoutProps>) {
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
        {topbar}
        <article className='container-fluid px-3'>
          <div className="row align-items-center py-2">
            <div className="col ms-3">
              <PageTitle title={title} />
            </div>
            <div className="col-auto me-2">
              {actions}
            </div>
          </div>
          <div className="row">
            {sidebar ? (
              <>
                <div className="col-24 col-lg-6">
                  {sidebar}
                </div>
                <div className="col-24 col-lg-18 position-relative">
                  {children}
                </div>
              </>
            ) : (
              <div className="col mb-2">
                {children}
              </div>
            )}
          </div>
        </article>
    </PageActionsContext.Provider>
  );
}

export default PageLayout;



