import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
  const [invoice, setInvoice] = useState({
    invoiceNo: "",
    date: "",
    dueDate: "",
    issuedTo: {
      name: "",
      phone: "",
      address: "",
    },
    paymentMethod: "Cash",
    items: [],
  });

  const [newItem, setNewItem] = useState({ description: "", unitPrice: "", qty: "" });
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice_${invoice.invoiceNo}`,
  });

  const getSubtotal = () => invoice.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  const handleChange = (e, field, subField) => {
    setInvoice((prev) => ({
      ...prev,
      [field]: subField ? { ...prev[field], [subField]: e.target.value } : e.target.value,
    }));
  };

  const handleItemChange = (e, field) => {
    setNewItem({ ...newItem, [field]: e.target.value });
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { ...newItem, unitPrice: parseFloat(newItem.unitPrice), qty: parseInt(newItem.qty) }],
    }));
    setNewItem({ description: "", unitPrice: "", qty: "" });
  };

  const deleteItem = (index) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const refreshInvoice = () => {
    setInvoice({
      invoiceNo: "",
      date: "",
      dueDate: "",
      issuedTo: {
        name: "",
        phone: "",
        address: "",
      },
      paymentMethod: "Cash",
      items: [],
    });
    setNewItem({ description: "", unitPrice: "", qty: "" });
  };

  const handleEmailShare = () => {
    const subject = `Invoice ${invoice.invoiceNo}`;
    const body = `Please find attached the invoice.\n\nInvoice No: ${invoice.invoiceNo}\nDate: ${invoice.date}\nDue Date: ${invoice.dueDate}\nTotal: Ksh ${getSubtotal()}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsAppShare = () => {
    const message = `Please find attached the invoice.\n\nInvoice No: ${invoice.invoiceNo}\nDate: ${invoice.date}\nDue Date: ${invoice.dueDate}\nTotal: Ksh ${getSubtotal()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "40px 0", fontFamily: "Arial, sans-serif" }}>
      <div ref={invoiceRef} style={{ width: "600px", padding: "20px", background: "#fff", borderRadius: "8px", textAlign: "left", border: "1px solid #ddd" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img 
            src="https://res.cloudinary.com/ddkkfumkl/image/upload/v1740010628/hwrdd7skf8v8xybyv40d.png" 
            alt="Company Logo" 
            style={{ width: "100px", height: "100px", margin: "0 auto 10px", borderRadius: "8px" }}
          />
          <h1 style={{ color: "green", fontSize: "24px" }}>INVOICE</h1>
        </div>

        <table style={{ width: "100%", marginBottom: "20px" }}>
          <tbody>
            <tr>
              <td><strong>Invoice No:</strong></td>
              <td><input type="text" value={invoice.invoiceNo} onChange={(e) => handleChange(e, "invoiceNo")} /></td>
            </tr>
            <tr>
              <td><strong>Date:</strong></td>
              <td><input type="date" value={invoice.date} onChange={(e) => handleChange(e, "date")} /></td>
            </tr>
            <tr>
              <td><strong>Due Date:</strong></td>
              <td><input type="date" value={invoice.dueDate} onChange={(e) => handleChange(e, "dueDate")} /></td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>Issued To</h3>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td><strong>Name:</strong></td>
              <td><input type="text" placeholder="Name" value={invoice.issuedTo.name} onChange={(e) => handleChange(e, "issuedTo", "name")} /></td>
            </tr>
            <tr>
              <td><strong>Phone:</strong></td>
              <td><input type="text" placeholder="Phone Number" value={invoice.issuedTo.phone} onChange={(e) => handleChange(e, "issuedTo", "phone")} /></td>
            </tr>
            <tr>
              <td><strong>Address:</strong></td>
              <td><input type="text" placeholder="Address" value={invoice.issuedTo.address} onChange={(e) => handleChange(e, "issuedTo", "address")} /></td>
            </tr>
          </tbody>
        </table>

        <h3>Payment Method</h3>
        <select value={invoice.paymentMethod} onChange={(e) => handleChange(e, "paymentMethod")}>
          <option value="Cash">Cash</option>
          <option value="Mpesa">Mpesa</option>
          <option value="Bank">Bank</option>
        </select>

        <h3>Items</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr style={{ background: "yellow" }}>
              <th>Description</th>
              <th>Unit Price (Ksh)</th>
              <th>Qty</th>
              <th>Total (Ksh)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>Ksh {item.unitPrice}</td>
                <td>{item.qty}</td>
                <td>Ksh {item.unitPrice * item.qty}</td>
                <td><button onClick={() => deleteItem(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <input type="text" placeholder="Description" value={newItem.description} onChange={(e) => handleItemChange(e, "description")} />
          <input type="number" placeholder="Unit Price" value={newItem.unitPrice} onChange={(e) => handleItemChange(e, "unitPrice")} />
          <input type="number" placeholder="Qty" value={newItem.qty} onChange={(e) => handleItemChange(e, "qty")} />
          <button onClick={addItem}>Add Item</button>
        </div>

        <h3 style={{ textAlign: "right" }}>Total: Ksh {getSubtotal()}</h3>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <div>
            <p>Thank you for doing business with us!</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p>__________________________</p>
            <p>Jamal Dahir</p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <button onClick={handlePrint} style={{ background: "green", color: "#fff" }}>Download PDF</button>
          <button onClick={handleEmailShare} style={{ background: "blue", color: "#fff" }}>Share via Email</button>
          <button onClick={handleWhatsAppShare} style={{ background: "green", color: "#fff" }}>Share via WhatsApp</button>
          <button onClick={refreshInvoice} style={{ background: "red", color: "#fff" }}>Refresh</button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;