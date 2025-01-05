import React from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { FaPlus } from 'react-icons/fa';
import { BiCalendarEvent, BiLink, BiMusic, BiUser } from 'react-icons/bi';
import { PageType } from '../../../data/entities/pages';

interface NewPageDropdownProps {
  onSelectPageType: (pageType: PageType) => void;
}

const NewPageDropdown: React.FC<NewPageDropdownProps> = ({ onSelectPageType }) => {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="font-bold"
          color="primary"
          variant="ghost"
          radius="full"
          endContent={<FaPlus />}
        >
          Add New Page
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
        <DropdownItem
          key={PageType.Profile}
          startContent={<BiUser className={iconClasses} />}
          description="Create a personalized profile page."
          onPress={() => onSelectPageType(PageType.Profile)}
        >
          Profile
        </DropdownItem>
        <DropdownItem
          key={PageType.Song}
          startContent={<BiMusic className={iconClasses} />}
          description="Create a page to showcase your music."
          onPress={() => onSelectPageType(PageType.Song)}
        >
          Song
        </DropdownItem>
        <DropdownItem
          key={PageType.Album}
          startContent={<BiLink className={iconClasses} />}
          description="Create a page for your album releases."
          onPress={() => onSelectPageType(PageType.Album)}
        >
          Album
        </DropdownItem>
        <DropdownItem
          key={PageType.Event}
          startContent={<BiCalendarEvent className={iconClasses} />}
          description="Create a page for your events."
          onPress={() => onSelectPageType(PageType.Event)}
        >
          Event
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NewPageDropdown;
