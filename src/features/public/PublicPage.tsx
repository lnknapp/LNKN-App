import { PageService } from '../../services';
import { useAsync, useUrlParams } from '../../hooks';
import PageRenderer from './PageRenderer';
import { PublicNotFound } from '../error';

export function PublicPage() {
  const pageService = new PageService();

  const userName = useUrlParams("username");
  const slug = useUrlParams("slug");

  const { value: page, loading, error } = useAsync(() => pageService.getByUsernameAndSlug(userName, slug), [slug, userName]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    if ((error as any).code === 404) return <PublicNotFound />;
  }

  return <PageRenderer page={page} />;
}

export default PublicPage;
