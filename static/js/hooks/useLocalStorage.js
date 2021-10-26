import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const readAndParse = (key) => {
    const item = window.localStorage.getItem(key);
    if (!item) return;
    const parsedItem = JSON.parse(item);
    return parsedItem;
  };

  const getInitialValue = () => {
    if (typeof window !== "undefined") {
      return readAndParse(key) || initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getInitialValue);

  useEffect(() => {
    try {
      setStoredValue(readAndParse(key));
    } catch (error) {
      console.log("error reading local storage", error);
    }
  }, [key]);

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log("error writing local storage", error);
      }
    },
    [storedValue]
  );

  const resetValue = useCallback(() => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  }, []);

  return [storedValue, setValue, resetValue];
}
