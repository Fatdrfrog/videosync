import { useRef, useCallback, useState, useEffect } from "react";

export const useHookWithRefCallback = () => {
  const ref = useRef(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);

  const setRef = useCallback((node) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        setSliderValue(ref.current.getCurrentTime());
      }
    }, 100);
    if (ref.current) {
      setDuration(ref.current.getDuration());
    }
    return () => clearInterval(interval);
  }, [ref.current?.getCurrentTime()]);

  return [sliderValue, setRef, duration];
};
