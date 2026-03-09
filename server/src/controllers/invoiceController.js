import { invoiceSample } from '../utils/demoData.js';

export const getInvoiceById = (req, res) => {
  const invoice = { ...invoiceSample, id: Number(req.params.id) || invoiceSample.id };
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const taxAmount = subtotal * invoice.taxRate;
  const total = subtotal + taxAmount;
  const balance = total - invoice.paidAmount;

  return res.json({ ...invoice, subtotal, taxAmount, total, balance });
};
