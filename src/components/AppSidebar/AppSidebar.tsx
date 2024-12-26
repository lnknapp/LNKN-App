import style from './AppSidebar.module.scss'
import { FaFile, FaCog, FaSignOutAlt, FaDashcube, FaLink, FaChartLine } from 'react-icons/fa'
import AppSidebarItem from './AppSidebarItem'

export const AppSidebar = () => {
  return (
    <nav id="main-menu" className={`${style.sidebar}`}>
      <div className={`${style.sidebarHeader}`}>
        LNKN
      </div>
      <div className={`${style.sidebarLinks} py-3`}>
        <AppSidebarItem to="/" icon={<FaDashcube className={style.icon} />} label="Dashboard" />
        <AppSidebarItem to="/profile" icon={<FaFile className={style.icon} />} label="Pages" />
        <AppSidebarItem to="/links" icon={<FaLink className={style.icon} />} label="Links" />
        <AppSidebarItem to="/analytics" icon={<FaChartLine className={style.icon} />} label="Analytics" />
      </div>
      <div className={`${style.sidebarFooter} py-3`}>
        <AppSidebarItem to="/settings" icon={<FaCog className={style.icon} />} label="Settings" />
        <AppSidebarItem to="/signout" icon={<FaSignOutAlt className={style.icon} />} label="Sign Out" />
      </div>
    </nav>
  )
}

export default AppSidebar
