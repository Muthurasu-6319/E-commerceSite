// Simple INR formatter used across the app
// Usage: formatINR(12345) => "₹12,345"
export function formatVND(value) { // Function name is kept for backward compatibility
  const num = Number(value) || 0;
  // Use en-IN locale for Indian Rupee symbol and grouping
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}