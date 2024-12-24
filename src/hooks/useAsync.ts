import { useCallback, useEffect, useState } from "react";

export function useAsync<T, E = Error>(
  callback: () => Promise<T>,
  dependencies: any[] = []
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<E | null>(null);
  const [value, setValue] = useState<T | null>(null);

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(null);
    setValue(null);
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
}

export default useAsync;
