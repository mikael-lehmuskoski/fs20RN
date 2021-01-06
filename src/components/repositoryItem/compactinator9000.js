export const compactinator9000 = (number) => {
  if (number < 1000) return number;
  return Math.round((number / 1000) * 10) / 10 + "k";
};