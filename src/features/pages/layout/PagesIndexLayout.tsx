import { Outlet } from "react-router-dom";
import { BasePageLayout } from "../../BasePageLayout"

export function PagesIndexLayout() {
  return (
    <BasePageLayout>
      <Outlet />
    </BasePageLayout>
  );
}

export default PagesIndexLayout

