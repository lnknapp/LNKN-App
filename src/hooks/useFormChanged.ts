import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

function useFormChanged<T>() {
  const { values, initialValues, isSubmitting } = useFormikContext<T>();
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const isEqual = JSON.stringify(values) === JSON.stringify(initialValues);
    setHasChanged(!isEqual);
  }, [values, initialValues]);

  useEffect(() => {
    if (isSubmitting) {
      setHasChanged(false);
    }
  }, [isSubmitting]);

  return hasChanged;
}

export default useFormChanged;
