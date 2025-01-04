import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BasePageLayout } from "../../BasePageLayout";
import { Tab, Tabs } from "@nextui-org/react";
import style from './SettingsLayout.module.scss';
import { useSetPageTitle } from "../../../hooks/usePageTitle";

export function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (key: string | number) => {
    navigate(key.toString());
  };
  useSetPageTitle("Settings");
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
          <Tab key="/settings/account" title="Account" />
          <Tab key="/settings/profile" title="Profile" />
          <Tab key="/settings/security" title="Security" />
          <Tab key="/settings/appearance" title="Appearance" />
          <Tab key="/settings/notifications" title="Notifications" />
          <Tab key="/settings/billing" title="Billing" />
          <Tab key="/settings/integrations" title="Integrations" />
        </Tabs>
        <div className={`${style.scrollIndicator}`}></div>
      </div>
      <Outlet />
    </BasePageLayout>
  );
}

export default SettingsLayout
