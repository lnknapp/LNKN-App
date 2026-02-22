import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppSidebar, ExceptionMessage } from "../components";
import { SidebarProvider } from "../components/AppSidebar/SidebarContext";

export interface AppLayoutProps extends React.PropsWithChildren {
  includeSidebar?: boolean;
}

export function AppLayout(props: Readonly<AppLayoutProps>) {

  return (
    <SidebarProvider>
      <div id="main-wrapper" className="fixed flex flex-col w-full h-full">
        <div className="relative grow">
          <div className="absolute flex flex-row w-full h-full">
            {props.includeSidebar && <AppSidebar />}
            <main id="main-content" role="main" className="grow h-full mh-full w-full overflow-auto">
              <AnimatePresence>
                <div key="exception" className="flex justify-center">
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
    </SidebarProvider>
  );
}

AppLayout.defaultProps = {
  includeSidebar: true
};

export default AppLayout;
