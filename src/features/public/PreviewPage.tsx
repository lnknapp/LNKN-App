import { PageService } from '../../services';
import { useAsync, useUrlParams } from '../../hooks';
import PageRenderer from './PageRenderer';

export function PreviewPage() {
  const pageService = new PageService();

  const userName = useUrlParams("username");
  const slug = useUrlParams("slug");

  const { value: page, loading, error } = useAsync(() => pageService.getPreview(userName, slug), [slug, userName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!page) return <p>Page not found</p>;

  return <PageRenderer page={page} slug={slug} />;
}

export default PreviewPage;
