import { PageService } from '../../services';
import { LinkService } from '../../services/pages/LinkService';
import { useAsync, useUrlParams } from '../../hooks';
import PageRenderer from './PageRenderer';
import { PublicNotFound } from '../error';

const pageService = new PageService();
const linkService = new LinkService();

export function PublicPage() {
  const userName = useUrlParams("username");
  const slug = useUrlParams("slug");

  const { value: page, loading, error } = useAsync(() => pageService.getByUsernameAndSlug(userName, slug), [slug, userName]);
  const { value: links } = useAsync(() => page ? linkService.getByPageId(page.id) : Promise.resolve([]), [page?.id]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    if ((error as any).code === 404) return <PublicNotFound />;
  }

  const pageWithLinks = page ? { ...page, links: links ?? page.links ?? [] } : page;

  return <PageRenderer page={pageWithLinks} />;
}

export default PublicPage;
