import style from './AppSidebar.module.scss'
import { FaDashcube, FaLink, FaChartLine, FaCog } from 'react-icons/fa'
import AppSidebarItem from './AppSidebarItem'
import { Link } from '../link'
import { routes } from '../../app/routes'
import { UserDropdown } from '../UserDropdown'
import { Divider } from '@nextui-org/react'
import { useLocation } from 'react-router-dom'
export const AppSidebar = () => {
  const location = useLocation();
  const isSettingsActive = location.pathname.startsWith('/settings');

  return (
    <nav id="main-menu" className={`${style.sidebar} hidden md:flex`}>

      <Link url={routes.home} className={`${style.sidebarHeader}`}>
        LNKN
      </Link>
      <div className={`${style.sidebarLinks} py-3`}>
        {/* add a heading that says MENU */}
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
  )
}

export default AppSidebar
