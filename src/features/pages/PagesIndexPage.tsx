import { useSetPageTitle } from "../../hooks";
import { Button } from "../../components";
import { router, routes } from "../../app/routes";
import { usePageActions } from "../BasePageLayout";

export function PagesIndexPage() {

  useSetPageTitle("Pages");
  usePageActions(
    <Button onClick={() => {}}>
      Add Page
    </Button>
  , []);

  return (
    <div>
      <Button onClick={() => router.navigateWithParams(routes.pages.page.index, new Map([["id", "3"]]))}>Page 3</Button>
    </div>
  );
}

export default PagesIndexPage;

