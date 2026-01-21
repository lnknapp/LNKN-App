import { useEffect } from "react";
import { useFormikContext } from "formik";
import { usePageDetails } from "./PageDetailsContext";
import { Page } from "../../../data/entities/pages";

/**
 * Keeps the shared PageDetailsContext page in sync with the current Formik values,
 * enabling live preview across the entire editing experience.
 *
 * Important: the parent Formik should NOT be using enableReinitialize, otherwise
 * context updates can cause Formik to reset while typing.
 */
export function FormikPageSync<TValues extends Partial<Page>>() {
  const { values } = useFormikContext<TValues>();
  const { setPage } = usePageDetails();

  useEffect(() => {
    setPage((prev: Page) => ({ ...prev, ...values }));
  }, [setPage, values]);

  return null;
}

export default FormikPageSync;

