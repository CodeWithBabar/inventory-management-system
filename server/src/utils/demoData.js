export const monthlySales = [
  { month: 'Jan', sales: 12000, purchases: 9000 },
  { month: 'Feb', sales: 15000, purchases: 10000 },
  { month: 'Mar', sales: 18000, purchases: 12000 },
  { month: 'Apr', sales: 17000, purchases: 11000 },
  { month: 'May', sales: 21000, purchases: 14000 },
  { month: 'Jun', sales: 24000, purchases: 16000 },
];

export const invoiceSample = {
  id: 1001,
  invoiceNumber: 'INV-1001',
  date: '2026-01-15',
  customer: {
    name: 'ABC Retail',
    email: 'procurement@abcretail.com',
    phone: '+1-555-1032',
    address: '120 Market St, Austin, TX',
  },
  items: [
    { sku: 'PRD-001', name: 'Barcode Scanner', qty: 3, price: 120 },
    { sku: 'PRD-002', name: 'Thermal Printer', qty: 2, price: 220 },
  ],
  taxRate: 0.1,
  paidAmount: 400,
};
