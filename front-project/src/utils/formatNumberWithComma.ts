export const formatNumberWithComma = (num: number | string): string => {
  if (typeof num === "string") {
    const parsed = parseFloat(num.replace(/,/g, ""));
    if (isNaN(parsed)) return "0";
    return parsed.toLocaleString();
  }
  return num.toLocaleString();
};
