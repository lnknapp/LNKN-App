import { useFormikContext } from 'formik';
import { usePageDetails } from './PageDetailsContext';
import { Divider, Input } from '@nextui-org/react';
import { PageType } from '../../../data/entities/pages';

export const PageSettings = () => {

  const { page } = usePageDetails();
  interface FormValues {
    slug: string;
    pixelId?: string;
    type: PageType;
    name: string;
  }

  const { values, handleChange, errors, touched } = useFormikContext<FormValues>();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">General</h2>
        <p className="text-gray-500 text-md">Manage general settings for your page, including shortcodes and other configurations.</p>
      </div>
      <Input
        isDisabled={page.type === "Profile"}
        type="string"
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        errorMessage={errors.name}
        isInvalid={!!errors.name && touched.name}
        variant="bordered"
      />
      {page.type !== "Profile" && (
        <Input
          isDisabled={true}
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
      <Input
        isDisabled={true}
        type="string"
        label="Page Type"
        name="slug"
        value={values.type}
        onChange={handleChange}
        errorMessage={errors.type}
        isInvalid={!!errors.type && touched.type}
        variant="bordered"
      />
      <Divider />
      <div>
        <h2 className="text-lg font-bold">Tracking</h2>
        <p className="text-gray-500 text-md">Manage your tracking settings for analytics and marketing purposes.</p>
      </div>
      <Input
        type="string"
        label="Meta Pixel ID"
        name="pixelId"
        value={values.pixelId}
        onChange={handleChange}
        errorMessage={errors.pixelId}
        isInvalid={!!errors.pixelId && touched.pixelId}
        variant="bordered"
      />
    </div>
  )
}
