import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BasePageLayout } from "../../BasePageLayout";
import { Tab, Tabs } from "@nextui-org/react";
import style from './SettingsLayout.module.scss';
import { useSetPageHeader } from "../../../hooks/usePageHeader";
import { routes } from "../../../app/routes";

export function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (key: string | number) => {
    navigate(key.toString());
  };
  useSetPageHeader("Settings");
  return (
    <BasePageLayout>
      <div className={`relative overflow-x-auto whitespace-nowrap mb-4 ${style.customScroll}`}>
        <Tabs
          aria-label="Settings Tabs"
          selectedKey={location.pathname}
          onSelectionChange={handleTabChange}
          variant="light"
          color="primary"
          className="font-semibold"
        >
          <Tab key={routes.settings.account} title="Account" />
          <Tab key={routes.settings.profile} title="Profile" />
          <Tab key={routes.settings.security} title="Security" />
          <Tab key={routes.settings.appearance} title="Appearance" />
          <Tab key={routes.settings.notifications} title="Notifications" />
          <Tab key={routes.settings.billing} title="Billing" />
          <Tab key={routes.settings.integrations} title="Integrations" />
        </Tabs>
        <div className={`${style.scrollIndicator}`}></div>
      </div>
      <Outlet />
    </BasePageLayout>
  );
}

export default SettingsLayout
