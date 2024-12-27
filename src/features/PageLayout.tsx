import React from "react";
import style from './PageLayout.module.scss';
import { usePageTitle } from "../hooks";
import Avatar from 'react-avatar';
import { UserService } from "../services";

function PageTitle() {
  const { title } = usePageTitle();
  if (title && title !== "") {
    return <h2 className="m-0">{title}</h2>;
  }
  return <div></div>;
}

interface PageLayoutProps extends React.PropsWithChildren {
  className?: string;
}

export function PageLayout({ children }: Readonly<PageLayoutProps>) {
  const user = UserService.getUserInfo();

  return (
    <>
      <div className={`${style.pageHeader}`}>
        <PageTitle />
        <div className="d-flex align-items-center">
          <Avatar name={user!.userName} size="40" round={true} />
          <div className="ms-2 d-flex flex-column justify-content-center">
            <div className="fw-bold" style={{fontSize: "1rem", lineHeight: '1.1rem'}}>@{user!.userName}</div>
            <div className="text-muted" style={{fontSize: "0.9rem", lineHeight: '1rem' }}>Basic Subscription</div>
          </div>
        </div>
      </div>
      <article className={`${style.pageContent} container-fluid`}>
        {children}
      </article>
    </>
  );
}

export default PageLayout;
