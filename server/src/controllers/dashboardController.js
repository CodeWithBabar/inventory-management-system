import { monthlySales } from '../utils/demoData.js';

export const summary = (req, res) => {
  return res.json({
    cards: {
      totalProducts: 128,
      lowStockItems: 9,
      pendingPurchaseOrders: 7,
      totalRevenue: 124000,
    },
    monthlySales,
    topCategories: [
      { name: 'Electronics', value: 45 },
      { name: 'Office', value: 30 },
      { name: 'Consumables', value: 25 },
    ],
  });
};
