export const setItem = <T>(key: string, value: T): void => {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error setting ${key} in localStorage`, error);
  }
};

// Get an item from localStorage
export const getItem = <T>(key: string): T | null => {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage`, error);
    return null;
  }
};

// Remove an item from localStorage
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage`, error);
  }
};

// Clear all localStorage keys
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage", error);
  }
};
