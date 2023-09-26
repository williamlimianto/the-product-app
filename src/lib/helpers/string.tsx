export const sanitizeString = (str: string) => {
  return (str || '').toLowerCase().trim();
};
