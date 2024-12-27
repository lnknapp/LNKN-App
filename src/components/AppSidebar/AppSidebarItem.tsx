import { NavLink } from 'react-router-dom';
import style from './AppSidebarItem.module.scss';

interface AppSidebarItemProps {
  to?: string;
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
}

const AppSidebarItem = ({ to, icon, label, onClick }: AppSidebarItemProps) => {

  if (onClick) {
    return (
      <span onClick={onClick} className={`${style.link} cursor-pointer`}>
        {icon}
        <span>{label}</span>
      </span>
    );
  }
  return (
    <NavLink to={to!} className={({ isActive }) => isActive ? `${style.link} ${style.activeLink}` : style.link}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default AppSidebarItem;
