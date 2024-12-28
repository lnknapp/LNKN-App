import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppSidebar, ExceptionMessage } from "../components";

export interface AppLayoutProps extends React.PropsWithChildren {
  includeSidebar?: boolean;
}

export function AppLayout(props: Readonly<AppLayoutProps>) {

  return (
    <div id="main-wrapper" className="position-fixed d-flex flex-column w-100 h-100">
      <div className="position-relative flex-grow-1">
        <div className="position-absolute d-flex flex-row w-100 h-100">
          {props.includeSidebar && <AppSidebar />}
          <main id="main-content" role="main" className="flex-grow-1 h-100 mh-100 w-100 overflow-auto">
            <AnimatePresence>
              <div key="exception" className="d-flex justify-content-center">
                <ExceptionMessage/>
              </div>
              <>
              {props.children ?? <Outlet />}
              </>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

AppLayout.defaultProps = {
  includeSidebar: true
};

export default AppLayout;
