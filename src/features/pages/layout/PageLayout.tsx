import { Outlet } from "react-router-dom";
import { useUrlParams, useAsync } from "../../../hooks";
import { PageService } from "../../../services";
import { PageDetailsProvider } from "../components/PageDetailsContext";

export function PageLayout() {

  const pageId = parseInt(useUrlParams("id"));
  const pageService = new PageService();

  const { value: page, loading, error } = useAsync(() => pageService.get(pageId), [pageId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!page) return <p>Page not found</p>;
  return (
    <PageDetailsProvider initialPage={page}>
      <Outlet />
    </PageDetailsProvider>
  );
}

export default PageLayout
