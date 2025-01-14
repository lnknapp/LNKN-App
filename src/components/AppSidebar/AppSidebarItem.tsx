import { NavLink } from 'react-router-dom';
import style from './AppSidebar.module.scss';

interface AppSidebarItemProps {
  to?: string;
  icon: JSX.Element;
  label: string;
  activeClassName?: string;
  notActiveClassName?: string;
  onClick?: () => void;
}

const AppSidebarItem = ({ to, icon, label, activeClassName, notActiveClassName, onClick }: AppSidebarItemProps) => {

  if (onClick) {
    return (
      <span onClick={onClick} className={`${style.link} cursor-pointer`}>
        {icon}
        <span>{label}</span>
      </span>
    );
  }
  return (
    <NavLink to={to!} className={
      ({ isActive }) => isActive ? `${style.link} ${style.activeLink} ${activeClassName}` : `${style.link} + ${notActiveClassName}`}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default AppSidebarItem;
