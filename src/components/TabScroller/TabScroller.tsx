import { PropsWithChildren } from 'react';
import style from './TabScroller.module.scss';

interface TabScrollerProps extends PropsWithChildren{
}

export const TabScroller= ({ children } : TabScrollerProps) => {

  return (
    <div className={`relative overflow-x-auto whitespace-nowrap mb-4 ${style.customScroll}`}>
      {children}
      <div className={`${style.scrollIndicator}`}></div>
    </div>
  );
};

export default TabScroller;
