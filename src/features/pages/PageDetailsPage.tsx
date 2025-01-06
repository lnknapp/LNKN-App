import { Button } from "@nextui-org/react";
import { routes } from "../../app/routes";
import { usePageActions } from "../BasePageLayout";
import { PageContents } from "./components/PageContents";
import { useNavigate } from "react-router-dom";
import { usePageDetails } from "./components/PageDetailsContext";
import { usePage } from "./hooks/usePage";
import { useSetPageTitle } from "../../hooks";
import { Formik } from "formik";
import * as yup from "yup";
import { useRef } from "react";

export function PageDetailsPage() {
  const navigate = useNavigate();
  const { page, updatePageKey, setPage } = usePageDetails();
  const { handleUpdatePage } = usePage();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useSetPageTitle(`${page?.name}`, [page]);
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
    name: yup.string().required("Name is required"),
  });

  return (
    <Formik
      initialValues={page}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleUpdatePage(values);
        setPage(values);
      }}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <PageContents />
          <button type="submit" ref={submitButtonRef} style={{ display: 'none' }} />
        </form>
      )}
    </Formik>
  );
}

export default PageDetailsPage;

