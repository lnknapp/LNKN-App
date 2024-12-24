import { useState} from "react";
import { AppTopbar } from "../components/AppTopbar/AppTopbar";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ExceptionMessage } from "../components";

export interface AppLayoutProps extends React.PropsWithChildren {
  includeSidebar?: boolean;
  includeTopbar?: boolean;
}

export function AppLayout(props: Readonly<AppLayoutProps>) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const onMenuToggle = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <div id="main-wrapper" className="position-fixed d-flex flex-column w-100 h-100">
      {props.includeTopbar &&
        <div id="main-topbar" className="position-relative flex-shrink-1">
          <AppTopbar showToggle={true} onToggle={onMenuToggle}></AppTopbar>
        </div>
        }
      <div className="position-relative flex-grow-1">
        <div className="position-absolute d-flex flex-row w-100 h-100">
          {props.includeSidebar && (
            <nav id="main-menu" className={`h-100 mh-100 ${isMenuExpanded ? "expanded" : ""}`} style={{"width": isMenuExpanded ? '20rem' : ''}}>
              <span>sidebar</span>
            </nav>
          )}
          <div id="main-menu-overlay" className={`d-lg-none ${isMenuExpanded ? "show" : ""}`} onClick={onMenuToggle}></div>
          <main id="main-content" role="main" className="flex-grow-1 h-100 mh-100 w-100 overflow-auto">
            <AnimatePresence>
              <div className="d-flex justify-content-center">
                <ExceptionMessage/>
              </div>
              {props.children ?? <Outlet />}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

AppLayout.defaultProps = {
  footerless: false,
  includeTopbar: true,
  includeSidebar: true
};

export default AppLayout;
