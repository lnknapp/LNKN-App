import { useNavigate } from "react-router-dom";
import { routes } from "../../app/routes";
import { Button } from "@nextui-org/react";
import { useAsync, useSetPageTitle, useUrlParams } from "../../hooks";
import { PageService } from "../../services";
import { usePageActions } from "../BasePageLayout";

export function PageDetailsPage() {

  const pageId = parseInt(useUrlParams("id"));
  const pageService = new PageService();
  const navigate = useNavigate();

  const { value: page, loading, error } = useAsync(() => pageService.get(pageId), [pageId]);

  useSetPageTitle(`Page: ${page?.name}`, [pageId]);
  usePageActions(
    <div className="flex justify-end space-x-2">
      <Button
        className="font-bold"
        color="primary"
        variant="ghost"
        radius="full"
        onPress={() => navigate(routes.pages.index)}
      >
        Exit
      </Button>
      <Button
        className="font-bold"
        color="primary"
        variant="ghost"
        radius="full"
        onPress={() => navigate(routes.pages.index)}
      >
        Save
      </Button>
      <Button
        className="font-bold px-6"
        color="primary"
        variant="solid"
        radius="full"
        onPress={() => navigate(routes.pages.index)}
      >
        Publish
      </Button>
    </div>
  )

  return (
    <div>

    </div>
  );
}

export default PageDetailsPage;

