import React from 'react';
import { Dropdown, DropdownTrigger, User, DropdownMenu, DropdownSection, DropdownItem } from '@nextui-org/react';
import { UserService } from '../../services';
import { getInitials } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../app/routes';

export const UserDropdown: React.FC = () => {
  const user = UserService.getUserInfo();
  const navigate = useNavigate();

  return (
    <Dropdown>
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
          <DropdownItem key="dashboard" onPress={() =>
            navigate(routes.home)
          }>Dashboard</DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" onPress={() => UserService.signout()}>Sign Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
