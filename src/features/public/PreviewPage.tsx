import { PageService } from '../../services';
import { UserProfileService } from '../../services/userProfile/UserProfileService';
import { useAsync, useUrlParams } from '../../hooks';
import PageRenderer from './PageRenderer';

const pageService = new PageService();
const userProfileService = new UserProfileService();

export function PreviewPage() {
  const userName = useUrlParams("username");
  const slug = useUrlParams("slug");

  const { value: page, loading, error } = useAsync(() => pageService.getPreview(userName, slug), [slug, userName]);
  const { value: profile } = useAsync(() => userName ? userProfileService.getPublicByUsername(userName) : Promise.resolve(null), [userName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!page) return <p>Page not found</p>;

  const socials = userProfileService.parseSocials(profile);

  return <PageRenderer page={page} socials={socials} />;
}

export default PreviewPage;
