import { Button } from "@nextui-org/react";
import { routes } from "../../app/routes";
import { usePageActions } from "../BasePageLayout";
import { useNavigate } from "react-router-dom";
import { usePageDetails } from "./components/PageDetailsContext";
import { usePage } from "./hooks/usePage";
import { useMemo, useRef } from "react";
import { Formik } from "formik";
import { PageSettings } from "./components/PageSettings";
import * as yup from "yup";
import { useSetPageHeader } from "../../hooks";
import { FaLink } from "react-icons/fa";
import { useRefresh } from "../../components";

export function PageSettingsPage() {
  const navigate = useNavigate();
  const { page, user, updatePageKey, setPage } = usePageDetails();
  const { handleUpdatePage } = usePage();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { refreshTrigger, setRefreshTrigger } = useRefresh();
  const pageUrl = useMemo(() => {
    if (page.type === "Profile") {
      return `http://localhost:3001/${user?.userName}`;
    } else if (page.slug) {
      return `http://localhost:3001/${user?.userName}/${page.slug}`;
    }
    return undefined;
  }, [page.type, page.slug, user?.userName]);

  const additionalItems = useMemo(() => {
    return pageUrl ? (
      <a href={pageUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary flex items-center mx-2">
        <FaLink />
        <span className="ml-2">
          {page.type === "Profile"
            ? `lnkn.my/${user?.userName}`
            : `lnkn.my/${user?.userName}/${page.slug}`}
        </span>
      </a>
    ) : null;
  }, [pageUrl, page.type, user?.userName, page.slug]);

  useSetPageHeader(page?.name, additionalItems, [page?.name, additionalItems])

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
        onPress={() => {
          if (submitButtonRef.current) {
            submitButtonRef.current.click();
          }
        }}
      >
        Save
      </Button>
      <Button
        className="font-bold px-6"
        color="primary"
        variant="solid"
        radius="full"
        onPress={() => {
          updatePageKey("isPublished", !page.isPublished);
          handleUpdatePage({ ...page, isPublished: !page.isPublished });
        }}
      >
        {page.isPublished ? "Unpublish" : "Publish"}
      </Button>
    </div>
  ,[page, submitButtonRef]);

    const validationSchema = yup.object().shape({
      slug: yup.string().required("Shortcode is required"),
    });
    return (

    <Formik
      initialValues={page}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleUpdatePage(values);
        setPage(values);
        setRefreshTrigger(!refreshTrigger);
      }}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <PageSettings />
          <button type="submit" ref={submitButtonRef} style={{ display: 'none' }} />
        </form>
      )}
    </Formik>
  );
}

export default PageSettingsPage;

