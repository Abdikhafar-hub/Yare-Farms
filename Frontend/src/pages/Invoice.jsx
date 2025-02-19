import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
  const [invoice, setInvoice] = useState({
    invoiceNo: "01234",
    date: "11.02.2030",
    dueDate: "11.03.2030",
    issuedTo: {
      name: "Richard Sanchez",
      company: "Thynk Unlimited",
      address: "123 Anywhere St., Any City",
    },
    payTo: {
      bank: "Borecele Bank",
      accountName: "Adeline Palmerston",
      accountNo: "0123 4567 8901",
    },
    items: [
      { description: "Brand consultation", unitPrice: 100, qty: 1 },
      { description: "Logo design", unitPrice: 100, qty: 1 },
      { description: "Website design", unitPrice: 100, qty: 1 },
      { description: "Social media templates", unitPrice: 100, qty: 1 },
      { description: "Brand photography", unitPrice: 100, qty: 1 },
      { description: "Brand guide", unitPrice: 100, qty: 1 },
    ],
    taxRate: 10,
  });

  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice_${invoice.invoiceNo}`,
  });

  const handleShareWhatsApp = () => {
    const message = `Invoice No: ${invoice.invoiceNo}\nTotal: $${getTotal()}\nDue Date: ${invoice.dueDate}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleShareEmail = () => {
    const subject = `Invoice No: ${invoice.invoiceNo}`;
    const body = `Hello,\n\nPlease find the invoice details below:\n\nInvoice No: ${invoice.invoiceNo}\nTotal: $${getTotal()}\nDue Date: ${invoice.dueDate}`;
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`
    );
  };

  const getSubtotal = () =>
    invoice.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  const getTotal = () => getSubtotal() + (getSubtotal() * invoice.taxRate) / 100;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <div ref={invoiceRef} style={{ padding: "20px", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h1 style={{ color: "green" }}>INVOICE</h1>
          </div>
          <div>
            <img src="your-logo-url.png" alt="Logo" style={{ width: "100px" }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <strong>ISSUED TO:</strong>
            <p>{invoice.issuedTo.name}</p>
            <p>{invoice.issuedTo.company}</p>
            <p>{invoice.issuedTo.address}</p>
          </div>
          <div>
            <strong>INVOICE NO:</strong> {invoice.invoiceNo} <br />
            <strong>DATE:</strong> {invoice.date} <br />
            <strong>DUE DATE:</strong> {invoice.dueDate}
          </div>
        </div>

        <div>
          <strong>PAY TO:</strong>
          <p>{invoice.payTo.bank}</p>
          <p>Account Name: {invoice.payTo.accountName}</p>
          <p>Account No.: {invoice.payTo.accountNo}</p>
        </div>

        <table width="100%" style={{ marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "yellow" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>DESCRIPTION</th>
              <th style={{ textAlign: "right", padding: "8px" }}>UNIT PRICE</th>
              <th style={{ textAlign: "right", padding: "8px" }}>QTY</th>
              <th style={{ textAlign: "right", padding: "8px" }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "8px" }}>{item.description}</td>
                <td style={{ textAlign: "right", padding: "8px" }}>${item.unitPrice}</td>
                <td style={{ textAlign: "right", padding: "8px" }}>{item.qty}</td>
                <td style={{ textAlign: "right", padding: "8px" }}>${item.unitPrice * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <p>SUBTOTAL: <strong>${getSubtotal()}</strong></p>
          <p>Tax ({invoice.taxRate}%): <strong>${(getSubtotal() * invoice.taxRate) / 100}</strong></p>
          <p style={{ fontSize: "18px", fontWeight: "bold", color: "orange" }}>TOTAL: ${getTotal()}</p>
        </div>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <p>________________________</p>
          <p style={{ fontStyle: "italic" }}>Adeline Palmerston</p>
        </div>
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={handlePrint} style={{ background: "green", color: "#fff", padding: "10px 15px", border: "none", cursor: "pointer" }}>
          Download PDF
        </button>
        <button onClick={handleShareEmail} style={{ background: "yellow", color: "#000", padding: "10px 15px", border: "none", cursor: "pointer" }}>
          Share via Email
        </button>
        <button onClick={handleShareWhatsApp} style={{ background: "orange", color: "#fff", padding: "10px 15px", border: "none", cursor: "pointer" }}>
          Share via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default Invoice;
