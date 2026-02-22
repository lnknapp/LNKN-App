import { useFormikContext } from 'formik';
import { PageType } from '../../../data/entities/pages';
import { Card, CardBody } from '@nextui-org/react';
import { useRef } from 'react';

interface FormValues {
  slug: string;
  pixelId?: string;
  type: PageType;
  name: string;
  theme: string;
}

const PALETTE = [
  // Neutrals
  '#ffffff', '#f5f5f5', '#e0e0e0', '#9e9e9e', '#424242', '#1a1a1a',
  // Blues
  '#e3f2fd', '#90caf9', '#1976d2', '#0d47a1',
  // Greens
  '#e8f5e9', '#81c784', '#2e7d32', '#022213',
  // Purples
  '#f3e5f5', '#ce93d8', '#7b1fa2', '#4a148c',
  // Pinks / Reds
  '#fce4ec', '#f48fb1', '#c62828',
  // Warm
  '#fff3e0', '#ffb74d', '#e65100',
  // Brand
  '#452bc5', '#1DB954', '#fc3c44',
];

const FONTS = [
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { label: 'Playfair', value: 'Playfair Display, serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Courier', value: 'Courier New, monospace' },
  { label: 'Impact', value: 'Impact, sans-serif' },
];

const isLight = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
};

export const PageAppearance = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const colorInputRef = useRef<HTMLInputElement>(null);

  const theme = (() => {
    try { return JSON.parse(values.theme); } catch { return {}; }
  })();

  const selectedColor: string = theme.backgroundColor || '#ffffff';
  const selectedFont: string = theme.fontFamily || FONTS[0].value;
  const selectedImageShape: 'sharp' | 'square' | 'round' = theme.imageShape || 'square';
  const selectedButtonShape: 'sharp' | 'square' | 'round' = theme.buttonShape || 'round';

  const setColor = (hex: string) => {
    setFieldValue('theme', JSON.stringify({ ...theme, backgroundColor: hex }));
  };

  const setFont = (font: string) => {
    setFieldValue('theme', JSON.stringify({ ...theme, fontFamily: font }));
  };

  const setImageShape = (shape: 'sharp' | 'square' | 'round') => {
    setFieldValue('theme', JSON.stringify({ ...theme, imageShape: shape }));
  };

  const setButtonShape = (shape: 'sharp' | 'square' | 'round') => {
    setFieldValue('theme', JSON.stringify({ ...theme, buttonShape: shape }));
  };

  return (
    <div className="space-y-8">

      {/* Background Color */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-default-600 uppercase tracking-wider">Background Color</p>

        {/* Current color preview + hex input */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => colorInputRef.current?.click()}
            className="w-10 h-10 rounded-xl border-2 border-default-200 shadow-sm shrink-0 transition-transform hover:scale-105"
            style={{ backgroundColor: selectedColor }}
            title="Pick custom color"
          />
          <input
            type="color"
            ref={colorInputRef}
            value={selectedColor}
            onChange={(e) => setColor(e.target.value)}
            className="sr-only"
          />
          <span
            className="text-sm font-mono px-3 py-1.5 rounded-lg border border-default-200 bg-default-50 cursor-pointer hover:bg-default-100 transition-colors"
            onClick={() => colorInputRef.current?.click()}
          >
            {selectedColor.toUpperCase()}
          </span>
          <span className="text-xs text-default-400">Click to pick a custom color</span>
        </div>

        {/* Palette grid */}
        <div className="flex flex-wrap gap-2">
          {PALETTE.map((hex) => {
            const selected = selectedColor.toLowerCase() === hex.toLowerCase();
            return (
              <button
                key={hex}
                type="button"
                onClick={() => setColor(hex)}
                title={hex}
                className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                  selected ? 'border-primary shadow-md scale-110' : 'border-default-200'
                }`}
                style={{ backgroundColor: hex }}
              >
                {selected && (
                  <span style={{ color: isLight(hex) ? '#000' : '#fff', fontSize: 12, lineHeight: 1 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Font */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-default-600 uppercase tracking-wider">Font</p>
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map(({ label, value }) => {
            const selected = selectedFont === value;
            return (
              <Card
                key={value}
                isPressable
                onPress={() => setFont(value)}
                className={`border-2 transition-all ${selected ? 'border-primary bg-primary-50' : 'border-default-200'}`}
              >
                <CardBody className="flex flex-col items-center py-4 gap-1">
                  <span className="text-2xl font-medium leading-none" style={{ fontFamily: value }}>Aa</span>
                  <span className="text-xs text-default-500 mt-1">{label}</span>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Image Shape */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-default-600 uppercase tracking-wider">Image Shape</p>
        <div className="grid grid-cols-3 gap-2">
          {([
            { label: 'Sharp',  value: 'sharp'  as const, radius: 'rounded-none' },
            { label: 'Square', value: 'square' as const, radius: 'rounded-xl' },
            { label: 'Round',  value: 'round'  as const, radius: 'rounded-full' },
          ]).map(({ label, value, radius }) => {
            const selected = selectedImageShape === value;
            return (
              <Card
                key={value}
                isPressable
                onPress={() => setImageShape(value)}
                className={`border-2 transition-all ${selected ? 'border-primary bg-primary-50' : 'border-default-200'}`}
              >
                <CardBody className="flex flex-col items-center py-4 gap-2">
                  <div className={`w-10 h-10 bg-default-300 ${radius}`} />
                  <span className="text-xs text-default-500">{label}</span>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Button Shape */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-default-600 uppercase tracking-wider">Button Shape</p>
        <div className="grid grid-cols-3 gap-2">
          {([
            { label: 'Sharp',  value: 'sharp'  as const, radius: 'rounded-none' },
            { label: 'Square', value: 'square' as const, radius: 'rounded-lg' },
            { label: 'Round',  value: 'round'  as const, radius: 'rounded-full' },
          ]).map(({ label, value, radius }) => {
            const selected = selectedButtonShape === value;
            return (
              <Card
                key={value}
                isPressable
                onPress={() => setButtonShape(value)}
                className={`border-2 transition-all ${selected ? 'border-primary bg-primary-50' : 'border-default-200'}`}
              >
                <CardBody className="flex flex-col items-center py-4 gap-2">
                  <div className={`w-16 h-6 bg-default-300 ${radius}`} />
                  <span className="text-xs text-default-500">{label}</span>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default PageAppearance;
