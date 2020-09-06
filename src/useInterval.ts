import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<typeof callback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = (): void => savedCallback && savedCallback.current && savedCallback.current();

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return (): void => clearInterval(id);
    }

    return (): void => { /* placeholder */ };
  }, [delay]);
};

export default useInterval;
