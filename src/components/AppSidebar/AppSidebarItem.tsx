import { NavLink } from 'react-router-dom';
import style from './AppSidebarItem.module.scss';

interface AppSidebarItemProps {
  to: string;
  icon: JSX.Element;
  label: string;
}

const AppSidebarItem = ({ to, icon, label }: AppSidebarItemProps) => {
  return (
    <NavLink to={to} className={({ isActive }) => isActive ? `${style.link} ${style.activeLink}` : style.link}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default AppSidebarItem;
