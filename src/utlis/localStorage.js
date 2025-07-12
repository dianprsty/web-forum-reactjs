export const load = (key, defaultValue) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return defaultValue ?? null;
  }
};
export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
