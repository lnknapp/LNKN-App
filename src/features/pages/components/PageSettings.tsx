import { useFormikContext } from 'formik';
import { usePageDetails } from './PageDetailsContext';
import { Input } from '@nextui-org/react';

export const PageSettings = () => {

  const { page } = usePageDetails();
  interface FormValues {
    slug: string;
  }

  const { values, handleChange, errors, touched } = useFormikContext<FormValues>();

  return (
    <div>
      {page.type !== "Profile" && (
        <Input
          type="string"
          label="Shortcode"
          name="slug"
          value={values.slug}
          onChange={handleChange}
          errorMessage={errors.slug}
          isInvalid={!!errors.slug && touched.slug}
          variant="bordered"
        />
      )}
    </div>
  )
}
