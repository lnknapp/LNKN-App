import React from "react";
import style from './PageLayout.module.scss';
import { usePageTitle } from "../hooks";

function PageTitle() {
  const { title } = usePageTitle();
  if (title && title !== "") {
    return <h2 className="m-0">{title}</h2>;
  }
  return <></>;
}

interface PageLayoutProps extends React.PropsWithChildren {
  className?: string;
}

export function PageLayout({children}: Readonly<PageLayoutProps>) {

  return (
    <>
      <div className={`${style.pageHeader}`}>
        <PageTitle />
      </div>
      <article className={`${style.pageContent} container-fluid`}>
        {children}
      </article>
    </>
  );
}

export default PageLayout;
