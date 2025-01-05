import React from 'react';
import { BiCalendarEvent, BiLink, BiMusic, BiSolidMagicWand, BiUser } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { PageType } from '../../../data/entities/pages';
import { PageOption } from './PageOption';

interface OptionSelectionProps {
  selectedPageType: PageType | null;
  onSelectOption: (option: string) => void;
}

export const OptionSelection: React.FC<OptionSelectionProps> = ({ selectedPageType, onSelectOption }) => {
  const getIcon = (pageType: PageType | null) => {
    switch (pageType) {
      case PageType.Profile:
        return <BiUser className="text-2xl mr-4" />;
      case PageType.Song:
        return <BiMusic className="text-2xl mr-4" />;
      case PageType.Album:
        return <BiLink className="text-2xl mr-4" />;
      case PageType.Event:
        return <BiCalendarEvent className="text-2xl mr-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        className="w-full flex items-center p-4 cursor-pointer hover:border-primary hover:bg-transparent border-2 border-transparent rounded-md transition ease duration-300"
        onClick={() => onSelectOption(PageOption.Custom)}
      >
        {getIcon(selectedPageType)}
        <div>
          <h3 className="text-lg font-bold">Custom</h3>
          <p className="text-gray-500">Create a fully customized {selectedPageType} page.</p>
        </div>
      </motion.div>
      <motion.div
        className="w-full flex items-center p-4 cursor-not-allowed border-2 border-transparent rounded-md transition ease duration-300 text-gray-400"
      >
        <BiSolidMagicWand className="text-2xl mr-4" />
        <div>
          <h3 className="text-lg font-bold">Quick Start (Coming Soon)</h3>
          <p className="text-gray-500">Use AI to quickly set up your {selectedPageType} page.</p>
        </div>
      </motion.div>
    </>
  );
};

export default OptionSelection;
