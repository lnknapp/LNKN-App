import { Outlet } from "react-router-dom";
import { BasePageLayout } from "../../BasePageLayout";

export function PageLayout() {
  return (
    <BasePageLayout>
      <Outlet />
    </BasePageLayout>
  );
}

export default PageLayout
