import React from "react";
import style from './PageLayout.module.scss';
import { usePageTitle } from "../hooks";
import Avatar from 'react-avatar';
import { UserService } from "../services";

function PageTitle() {
  const { title } = usePageTitle();
  if (title && title !== "") {
    return <h2 className="text-3xl font-semibold m-0">{title}</h2>;
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
        <div className="flex items-center">
          <Avatar name={user!.userName} size="40" round={true} />
          <div className="ms-2 d-flex flex-col justify-center">
            <div className="font-bold" style={{fontSize: "1rem", lineHeight: '1.1rem'}}>@{user!.userName}</div>
            <div className="text-gray-500" style={{fontSize: "0.9rem", lineHeight: '1rem' }}>Basic Subscription</div>
          </div>
        </div>
      </div>
      <article className={`${style.pageContent}`}>
        {children}
      </article>
    </>
  );
}

export default PageLayout;
