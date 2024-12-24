import { useState } from 'react';

export function useSpinner() {
  const [showSpinner, setShowSpinner] = useState(false);

  const show = () => setShowSpinner(true);
  const hide = () => setShowSpinner(false);

  return { showSpinner, show, hide };
}
