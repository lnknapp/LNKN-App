import React from "react";
import { Outlet } from "react-router-dom";
import AppLayout from "../../AppLayout";
import style from "../styles/Account.module.scss";

export function AccountPageLayout(props: React.PropsWithChildren) {
  return (
    <AppLayout includeSidebar={false}>
      <div className={`h-full flex flex-col justify-center`}>
        <div className={`flex h-full flex-col lg:flex-row ${style.pageContainer}`}>
          <div className={`${style.contentContainer} bg-white text-black`}>
              <div className="w-full flex lg:hidden justify-center">
              </div>
              <Outlet />
          </div>
          <div className={`${style.contentContainer} ${style.gradient} items-center`}>
            <h2 className={style.heading}>Connect Your Audience with a Single Link</h2>
            <div className={style.subheading}>
              <span>Share all your important links in one place and drive more traffic to your content.</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default AccountPageLayout;
