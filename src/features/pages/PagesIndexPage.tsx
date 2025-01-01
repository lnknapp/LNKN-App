import { useSetPageTitle } from "../../hooks";
import { Button } from "../../components";
import { router, routes } from "../../app/routes";

export function PagesIndexPage() {

  useSetPageTitle("Pages");

  return (
    <div>
      <Button onClick={() => router.navigateWithParams(routes.pages.page.index, new Map([["id", "3"]]))}>Page 3</Button>
    </div>
  );
}

export default PagesIndexPage;

