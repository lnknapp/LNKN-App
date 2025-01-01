import style from './AppSidebar.module.scss'
import { FaFile, FaDashcube, FaLink, FaChartLine } from 'react-icons/fa'
import AppSidebarItem from './AppSidebarItem'
import { Link } from '../link'
import { routes } from '../../app/routes'
import { UserDropdown } from '../UserDropdown'
export const AppSidebar = () => {

  return (
    <nav id="main-menu" className={`${style.sidebar}`}>
      <Link url={routes.home} className={`${style.sidebarHeader}`}>
        LNKN
      </Link>
      <div className={`${style.sidebarLinks} py-3`}>
        <AppSidebarItem to={routes.home} icon={<FaDashcube className={style.icon} />} label="Dashboard" />
        <AppSidebarItem to={routes.pages.index} icon={<FaFile className={style.icon} />} label="Pages" />
        <AppSidebarItem to="/links" icon={<FaLink className={style.icon} />} label="Links" />
        <AppSidebarItem to="/analytics" icon={<FaChartLine className={style.icon} />} label="Analytics" />
      </div>
      <div className={`${style.sidebarFooter} py-3`}>
        <UserDropdown />
      </div>
    </nav>
  )
}

export default AppSidebar
