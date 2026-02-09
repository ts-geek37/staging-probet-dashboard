/**
 * Formats a numeric amount into a human-readable string with suffixes.
 * - < 1,000: No suffix
 * - 1,000 - 99,999: 'k' suffix
 * - 100,000 - 9,999,999: 'Lacs' suffix
 * - 10,000,000+: 'Cr' suffix
 */
export const formatAmount = (amount: number | string | null): string => {
  if (amount === null || amount === undefined) return "-";

  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "-";

  if (num < 1000) {
    return num.toString();
  } else if (num < 100000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
  } else if (num < 10000000) {
    return (num / 100000).toFixed(num % 100000 === 0 ? 0 : 1) + " Lacs";
  } else {
    return (num / 10000000).toFixed(num % 10000000 === 0 ? 0 : 1) + " Cr";
  }
};
