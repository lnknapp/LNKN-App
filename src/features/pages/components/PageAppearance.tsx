import { useFormikContext } from 'formik';
import { PageType } from '../../../data/entities/pages';
import { SketchPicker } from 'react-color';

export const PageAppearance = () => {
  interface FormValues {
    slug: string;
    pixelId?: string;
    type: PageType;
    name: string;
    theme: string; // Add theme property
  }

  const { values, setFieldValue } = useFormikContext<FormValues>();

  const handleColorChange = (color: any) => {
    const newTheme = { ...JSON.parse(values.theme), backgroundColor: color.hex };
    setFieldValue('theme', JSON.stringify(newTheme));
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = { ...JSON.parse(values.theme), fontFamily: event.target.value };
    setFieldValue('theme', JSON.stringify(newTheme));
  };

  const availableFonts = [
    'Arial, sans-serif',
    'Georgia, serif',
    'Times New Roman, Times, serif',
    'Courier New, Courier, monospace',
    'Verdana, sans-serif',
    'Tahoma, sans-serif',
    'Trebuchet MS, sans-serif',
    'Impact, sans-serif',
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md font-semibold mb-2">Font</h3>
        <select
          name="fontFamily"
          value={JSON.parse(values.theme).fontFamily || availableFonts[0]}
          onChange={handleFontChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        >
          {availableFonts.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font.split(',')[0]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2">Background Color</h3>
        <SketchPicker
          color={JSON.parse(values.theme).backgroundColor}
          onChangeComplete={handleColorChange}
        />
      </div>
    </div>
  );
};

export default PageAppearance;
