import { useFormikContext } from 'formik';
import { usePageDetails } from './PageDetailsContext';
import { Input } from '@nextui-org/react';

export const PageContents = () => {

  const { page } = usePageDetails();
  interface FormValues {
    name: string;
  }

  const { values, handleChange, errors, touched } = useFormikContext<FormValues>();

  return (
    <div className="space-y-4">
      {/* <Input
        isDisabled={page.type === "Profile"}
        type="string"
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        errorMessage={errors.name}
        isInvalid={!!errors.name && touched.name}
        variant="bordered"
      /> */}
    </div>
  )
}
