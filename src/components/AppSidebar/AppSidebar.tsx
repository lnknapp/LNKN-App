import style from './AppSidebar.module.scss'
import { FaDashcube, FaLink, FaChartLine, FaCog } from 'react-icons/fa'
import AppSidebarItem from './AppSidebarItem'
import { Link } from '../link'
import { routes } from '../../app/routes'
import { UserDropdown } from '../UserDropdown'
import { Divider } from '@nextui-org/react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSidebar } from './SidebarContext'

export const AppSidebar = () => {
  const location = useLocation();
  const isSettingsActive = location.pathname.startsWith('/settings');
  const { isOpen, close } = useSidebar();

  // Close on navigation
  useEffect(() => { close(); }, [location.pathname]);

  const nav = (
    <nav id="main-menu" className={style.sidebar}>
      <Link url={routes.home} className={`${style.sidebarHeader}`}>
        LNKN
      </Link>
      <div className={`${style.sidebarLinks} py-3`}>
        <h3 className={`${style.heading} text-white text-xs font-semibold`}>MENU</h3>
        <AppSidebarItem to={routes.home} icon={<FaDashcube className={style.icon} size={20}/>} label="Dashboard" />
        <AppSidebarItem to={routes.pages.index} icon={<FaLink className={style.icon} size={20} />} label="Pages" />
        <AppSidebarItem to={routes.analytics.index} icon={<FaChartLine className={style.icon} size={20} />} label="Analytics" />
        <div className="px-5">
          <Divider className="my-8 bg-neutral-600"/>
        </div>
        <h3 className={`${style.heading} text-white text-xs font-semibold`}>GENERAL</h3>
        <AppSidebarItem to={routes.settings.account} icon={<FaCog className={style.icon} size={20} />} label="Settings"
          notActiveClassName={`${isSettingsActive ? style.activeLink : ''}`}
          activeClassName={`${isSettingsActive ? style.activeLink : ''}`}/>
      </div>
      <div className={`${style.sidebarFooter} py-3`}>
        <div className="px-5">
          <Divider className="my-4 bg-neutral-600"/>
        </div>
        <div className="ms-6 my-3">
          <UserDropdown />
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden md:flex h-full">
        {nav}
      </div>

      {/* Mobile: backdrop + slide-in drawer */}
      <div className="md:hidden">
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={close}
          />
        )}
        {/* Drawer */}
        <div
          className="fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out"
          style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          {nav}
        </div>
      </div>
    </>
  );
};

export default AppSidebar;
