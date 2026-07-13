import { useCallback, useState } from 'react';

type UseBooleanReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  set: (val: boolean) => void;
};

export const useBoolean = (initialValue: boolean = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(prev => !prev), []);
  const set = useCallback((val: boolean) => setValue(val), []);

  return { value, setTrue, setFalse, toggle, set };
};