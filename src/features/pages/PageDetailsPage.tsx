import { useSetPageTitle, useUrlParams } from "../../hooks";

export function PageDetailsPage() {

  const pageId = useUrlParams("id");

  useSetPageTitle(`Page: ${pageId}`, [pageId]);

  return (
    <div>

    </div>
  );
}

export default PageDetailsPage;

