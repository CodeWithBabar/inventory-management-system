import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http } from '../api/http';

const InvoicePage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    http.get(`/invoices/${id}`).then((res) => setInvoice(res.data));
  }, [id]);

  if (!invoice) return <div className="card">Loading invoice...</div>;

  return (
    <div className="card printable" id="invoice-print-area">
      <div className="invoice-actions">
        <button onClick={() => window.print()}>Print Invoice</button>
      </div>
      <h2>{invoice.invoiceNumber}</h2>
      <p>Date: {invoice.date}</p>
      <p>Customer: {invoice.customer.name}</p>
      <table className="table">
        <thead><tr><th>SKU</th><th>Item</th><th>Qty</th><th>Price</th><th>Line Total</th></tr></thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.sku}><td>{item.sku}</td><td>{item.name}</td><td>{item.qty}</td><td>{item.price}</td><td>{item.qty * item.price}</td></tr>
          ))}
        </tbody>
      </table>
      <p>Subtotal: {invoice.subtotal.toFixed(2)}</p>
      <p>Tax: {invoice.taxAmount.toFixed(2)}</p>
      <p>Total: {invoice.total.toFixed(2)}</p>
      <p>Paid: {invoice.paidAmount.toFixed(2)}</p>
      <p><strong>Balance: {invoice.balance.toFixed(2)}</strong></p>
    </div>
  );
};

export default InvoicePage;
