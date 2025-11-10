// Simple VND formatter
// Usage: formatVND(12345000) => "12.345.000 ₫" (or similar, depending on the environment)
export function formatVND(value) {
  const num = Number(value) || 0;
  // Use 'vi-VN' locale for Vietnamese Dong symbol (₫) and grouping.
  // Changed 'en-IN' to 'vi-VN' and 'INR' to 'VND'.
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND', 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}