import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = () => {
  const invoiceRef = useRef();

  const [invoice, setInvoice] = useState({
    invoiceNo: "",
    date: "",
    dueDate: "",
    issuedTo: { name: "", phone: "", address: "" },
    paymentMethod: "Cash",
    items: [],
  });

  const [newItem, setNewItem] = useState({ description: "", unitPrice: "", qty: "" });

  const handlePrint = () => {
    const input = invoiceRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Invoice_${invoice.invoiceNo}.pdf`);
    });
  };

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
      items: [
        ...prev.items,
        { ...newItem, unitPrice: parseFloat(newItem.unitPrice), qty: parseInt(newItem.qty) },
      ],
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
      issuedTo: { name: "", phone: "", address: "" },
      paymentMethod: "Cash",
      items: [],
    });
    setNewItem({ description: "", unitPrice: "", qty: "" });
  };

  const handleEmailShare = () => {
    const input = invoiceRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      const pdfBlob = pdf.output("blob"); 
      const pdfUrl = URL.createObjectURL(pdfBlob); 

     
      pdf.save(`Invoice_${invoice.invoiceNo}.pdf`);

      const subject = `Invoice ${invoice.invoiceNo}`;
      const body = `Please find attached the invoice.\n\nInvoice No: ${invoice.invoiceNo}\nDate: ${invoice.date}\nDue Date: ${invoice.dueDate}\nTotal: Ksh ${getSubtotal()}\n\nThe PDF has been downloaded. Please attach it from your downloads folder.`;

      const emailLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const emailAnchor = document.createElement("a");
      emailAnchor.href = emailLink;
      emailAnchor.click();

           
      URL.revokeObjectURL(pdfUrl);
    });
  };

  const handleWhatsAppShare = () => {
    const input = invoiceRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      const pdfBlob = pdf.output("blob"); // Generate PDF as a Blob
      const pdfUrl = URL.createObjectURL(pdfBlob); // Create a temporary URL for the PDF

      // Save the PDF locally
      pdf.save(`Invoice_${invoice.invoiceNo}.pdf`);

      const message = `Please find attached the invoice.\n\nInvoice No: ${invoice.invoiceNo}\nDate: ${invoice.date}\nDue Date: ${invoice.dueDate}\nTotal: Ksh ${getSubtotal()}\n\nThe PDF has been downloaded. Please attach it from your downloads folder.`;
      const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
      const whatsappAnchor = document.createElement("a");
      whatsappAnchor.href = whatsappLink;
      whatsappAnchor.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(pdfUrl);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "40px 0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        ref={invoiceRef}
        style={{
          width: "600px",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          textAlign: "left",
          border: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <p><strong>Yare Farm</strong></p>
            <p>Nakuru Town, Nakuru County</p>
            
            <p>Phone: 0715505444, 0757800700</p>
            <p>Email: yarefarm@gmail.com</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src="/images/logo2.png"
              alt="Company Logo"
              style={{ width: "100px", height: "100px", margin: "0 auto 10px", borderRadius: "8px" }}
            />
            <h1 style={{ color: "green", fontSize: "24px" }}>INVOICE</h1>
          </div>
        </div>

        <table style={{ width: "100%", marginBottom: "20px" }}>
          <tbody>
            <tr>
              <td>
                <strong>Invoice No:</strong>
              </td>
              <td>
                <input
                  type="text"
                  value={invoice.invoiceNo}
                  onChange={(e) => handleChange(e, "invoiceNo")}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Date:</strong>
              </td>
              <td>
                <input type="date" value={invoice.date} onChange={(e) => handleChange(e, "date")} />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Due Date:</strong>
              </td>
              <td>
                <input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => handleChange(e, "dueDate")}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>Issued To</h3>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>
                <strong>Name:</strong>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  value={invoice.issuedTo.name}
                  onChange={(e) => handleChange(e, "issuedTo", "name")}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Phone:</strong>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={invoice.issuedTo.phone}
                  onChange={(e) => handleChange(e, "issuedTo", "phone")}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Address:</strong>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Address"
                  value={invoice.issuedTo.address}
                  onChange={(e) => handleChange(e, "issuedTo", "address")}
                />
              </td>
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
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>Ksh {item.unitPrice}</td>
                <td>{item.qty}</td>
                <td>Ksh {item.unitPrice * item.qty}</td>
                <td>
                  <button
                    onClick={() => deleteItem(index)}
                    style={{
                      visibility: "hidden",
                      width: "0",
                      height: "0",
                      padding: "0",
                      border: "none",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => handleItemChange(e, "description")}
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={newItem.unitPrice}
            onChange={(e) => handleItemChange(e, "unitPrice")}
          />
          <input
            type="number"
            placeholder="Qty"
            value={newItem.qty}
            onChange={(e) => handleItemChange(e, "qty")}
          />
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
      </div>

      {/* Buttons and Delete Dropdown (Excluded from Print) */}
      <div
        style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", width: "600px" }}
        className="print:hidden"
      >
        <button onClick={handlePrint} style={{ background: "green", color: "#fff" }}>
          Download PDF
        </button>
        <button onClick={handleEmailShare} style={{ background: "blue", color: "#fff" }}>
          Share via Email
        </button>
        <button onClick={handleWhatsAppShare} style={{ background: "green", color: "#fff" }}>
          Share via WhatsApp
        </button>
        <button onClick={refreshInvoice} style={{ background: "red", color: "#fff" }}>
          Refresh
        </button>
        <select
          value={-1}
          onChange={(e) => {
            const index = parseInt(e.target.value);
            if (index >= 0) deleteItem(index);
            e.target.value = -1;
          }}
        >
          <option value={-1}>Select Item to Delete</option>
          {invoice.items.map((item, index) => (
            <option key={index} value={index}>
              {item.description} (Ksh {item.unitPrice * item.qty})
            </option>
          ))}
        </select>
      </div>

      {/* Hide buttons when printing */}
      <style>
        {`
          @media print {
            .print\\:hidden { display: none !important; }
          }
        `}
      </style>
    </div>
  );
};

export default Invoice;