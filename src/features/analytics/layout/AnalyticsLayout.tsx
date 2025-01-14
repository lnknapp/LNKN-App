import { Outlet } from "react-router-dom";
import { BasePageLayout } from "../../BasePageLayout";
export function AnalyticsLayout() {
  return (
    <BasePageLayout>
      <Outlet />
    </BasePageLayout>
  );
}

export default AnalyticsLayout
