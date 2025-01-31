import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUrlParams, useAsync } from "../../../hooks";
import { PageService, UserService } from "../../../services";
import { PageDetailsProvider } from "../components/PageDetailsContext";
import { Tabs, Tab } from "@nextui-org/react";
import { routes } from "../../../app/routes";
import { RefreshProvider, TabScroller } from "../../../components";
import PhonePreview from "../../../components/PhonePreview/PhonePreview";

export function PageLayout() {

  const navigate = useNavigate();
  const location = useLocation();
  const pageId = parseInt(useUrlParams("id"));
  const pageService = new PageService();

  const handleTabChange = (key: string | number) => {
    navigate(key.toString());
  };
  const { value: page, loading, error } = useAsync(() => pageService.get(pageId), [pageId]);

    const userInfo = UserService.getUserInfo();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!page) return <p>Page not found</p>;

  const pageUrl = `http://localhost:3000/${userInfo?.userName}/${page.slug}`; // Adjust the URL as needed
  // const pageUrl = 'https://kupeomusic.com/all-my-friends';

  return (
    <RefreshProvider>
      <PageDetailsProvider initialPage={page}>
        <div className="flex h-full">
          <div className="flex-grow">
            <TabScroller>
              <Tabs
                aria-label="Pages Tabs"
                selectedKey={location.pathname}
                onSelectionChange={handleTabChange}
                variant="light"
                color="primary"
                className="font-semibold"
              >
                <Tab key={routes.pages.page.index.replace(":id", pageId.toString())} title="Details" />
                <Tab key={routes.pages.page.appearance.replace(":id", pageId.toString())} title="Appearance" />
                <Tab key={routes.pages.page.settings.replace(":id", pageId.toString())} title="Settings" />
              </Tabs>
            </TabScroller>
            <Outlet />
          </div>
          <div className="flex items-start">
            <PhonePreview className="ms-[3rem]" pageUrl={pageUrl} />
          </div>
        </div>
      </PageDetailsProvider>
    </RefreshProvider>
  );
}

export default PageLayout
