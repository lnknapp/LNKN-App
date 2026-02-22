import type { CSSProperties } from 'react';

export const BUTTON_STYLES = [
  { id: 'solid',   label: 'Solid'   },
  { id: 'minimal', label: 'Minimal' },
  { id: 'dark',    label: 'Dark'    },
  { id: 'outline', label: 'Outline' },
  { id: 'soft',    label: 'Soft'    },
] as const;

export type ButtonStyleId = typeof BUTTON_STYLES[number]['id'];

export const BUTTON_STYLE_PREVIEWS: Record<ButtonStyleId, CSSProperties> = {
  solid:   { backgroundColor: '#022213', color: '#fff' },
  minimal: { backgroundColor: '#fff', color: '#000', border: '2px solid #000', boxShadow: '2px 2px 0 #000' },
  dark:    { backgroundColor: '#111', color: '#fff' },
  outline: { backgroundColor: 'transparent', color: '#111', border: '2px solid #111' },
  soft:    { backgroundColor: 'rgba(0,0,0,0.06)', color: '#111', border: '1px solid rgba(0,0,0,0.15)' },
};
