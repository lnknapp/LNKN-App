import React from "react";
import style from './BasePageLayout.module.scss';
import { usePageTitle } from "../hooks";
import { DropdownSection} from "@nextui-org/react";
import { UserService } from "../services";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";

function PageTitle() {
  const { title } = usePageTitle();
  if (title && title !== "") {
    return <h2 className="text-3xl font-semibold m-0">{title}</h2>;
  }
  return <div></div>;
}

interface BasePageLayoutProps extends React.PropsWithChildren {
  className?: string;
}

export function BasePageLayout({ children }: Readonly<BasePageLayoutProps>) {
  const user = UserService.getUserInfo();
  const getInitials = (name: string) => {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  };

  return (
    <>
      <div className={`${style.pageHeader}`}>
        <PageTitle />
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                name: getInitials(user!.userName),
                classNames: {
                  base: "bg-gradient-to-br from-purple-400 to-purple-600",
                  name: "text-lg font-semibold text-white",
                }
              }}
              className="transition-transform"
              description="Basic Subscription"
              name={`@${user!.userName}`}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            className="p-3"
            disabledKeys={["profile"]}
            itemClasses={{
              base: [
                "rounded-md",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            }}
          >
            <DropdownSection showDivider aria-label="Profile & Actions">
              <DropdownItem key="dashboard">Dashboard</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
            </DropdownSection>
            <DropdownSection aria-label="Help & Feedback">
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout">Sign Out</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
      <article className={`${style.pageContent}`}>
        {children}
      </article>
    </>
  );
}

export default BasePageLayout;
