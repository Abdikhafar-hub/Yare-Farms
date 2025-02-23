import React, { useState } from 'react';
import './Invoice.css';
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet as PDFStyleSheet } from '@react-pdf/renderer';
import * as html2pdf from 'html2pdf.js';
import logoImage from '/images/logo2.png'; 
import signatureImage from '/images/sign.png'; 

const Invoice = () => {
  const [companyName, setCompanyName] = useState('YareFarm');
  const [companyAddress, setCompanyAddress] = useState('Nakuru Town, Nakuru County');
  const [companyPhone, setCompanyPhone] = useState('0715505444, 0757800700');
  const [companyEmail, setCompanyEmail] = useState('yarefarm@gmail.com');

  const [recipientName, setRecipientName] = useState('Name');
  const [recipientAddress, setRecipientAddress] = useState('Address');
  const [recipientPhone, setRecipientPhone] = useState('Phone');

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ sn: '', description: '', quantity: '', unitPrice: '' });

  const addItem = () => {
    if (newItem.description && newItem.quantity && newItem.unitPrice) {
      setItems([...items, { ...newItem, sn: items.length + 1, total: newItem.quantity * newItem.unitPrice }]);
      setNewItem({ sn: '', description: '', quantity: '', unitPrice: '' });
    }
  };

  const deleteSelectedItems = () => {
    const updatedItems = items.filter((item) => !item.selected);
    setItems(updatedItems.map((item, index) => ({ ...item, sn: index + 1 })));
  };

  const handleItemSelect = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    setItems(updatedItems);
  };

  const refreshForm = () => {
    setRecipientName('Name');
    setRecipientAddress('Address');
    setRecipientPhone('Phone');
    setInvoiceNumber('');
    setInvoiceDate('');
    setDueDate('');
    setItems([]);
    setNewItem({ sn: '', description: '', quantity: '', unitPrice: '' });
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  // PDF Document for react-pdf
  const InvoicePDF = () => (
    <Document>
      <Page style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <View style={pdfStyles.companyInfo}>
            <Text style={pdfStyles.companyName}>{companyName}</Text>
            <Text style={pdfStyles.companyAddress}>{companyAddress}</Text>
            <Text style={pdfStyles.companyContact}>Phone: {companyPhone}</Text>
            <Text style={pdfStyles.companyContact}>Email: {companyEmail}</Text>
          </View>
          <View style={pdfStyles.invoiceHeader}>
            <Image src={logoImage} style={pdfStyles.logo} />
            <Text style={pdfStyles.invoiceTitle}>INVOICE</Text>
          </View>
        </View>
        <View style={pdfStyles.invoiceDetails}>
          <Text>Invoice NO: {invoiceNumber}</Text>
          <Text>Date: {invoiceDate}</Text>
          <Text>Due Date: {dueDate}</Text>
        </View>
        <View style={pdfStyles.billTo}>
          <Text style={pdfStyles.billToTitle}>BILLED TO:</Text>
          <Text>Name: {recipientName}</Text>
          <Text>Address: {recipientAddress}</Text>
          <Text>Phone: {recipientPhone}</Text>
        </View>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableHeader}>
            <Text style={pdfStyles.tableCell}>SN</Text>
            <Text style={pdfStyles.tableCell}>DESCRIPTION</Text>
            <Text style={pdfStyles.tableCell}>QUANTITY</Text>
            <Text style={pdfStyles.tableCell}>UNIT PRICE (KSH)</Text>
            <Text style={pdfStyles.tableCell}>TOTAL (KSH)</Text>
          </View>
          {items.map((item) => (
            <View key={item.sn} style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCell}>{item.sn}</Text>
              <Text style={pdfStyles.tableCell}>{item.description}</Text>
              <Text style={pdfStyles.tableCell}>{item.quantity}</Text>
              <Text style={pdfStyles.tableCell}>{item.unitPrice}</Text>
              <Text style={pdfStyles.tableCell}>{item.total}</Text>
            </View>
          ))}
        </View>
        <Text style={pdfStyles.total}>TOTAL DUE: {calculateTotal()} KSH</Text>
        <Text style={pdfStyles.thankYou}>Thank you for doing business with us!</Text>
        <Image src={signatureImage} style={pdfStyles.signatureImage} />
        <View style={pdfStyles.signatureSection}>
          <Text style={pdfStyles.signatureLine}>_________________________</Text>
          <Text style={pdfStyles.signature}>Jamal Dahir</Text>
        </View>
      </Page>
    </Document>
  );

  const downloadPDF = () => {
    const element = document.getElementById('invoice');
    html2pdf(element, {
      margin: 10,
      filename: `invoice_${invoiceNumber}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };

  const shareViaWhatsApp = () => {
    const message = `Invoice #${invoiceNumber} - Total: ${calculateTotal()} KSH. View details: [Link to your website or PDF]`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `Invoice #${invoiceNumber}`;
    const body = `Please find attached Invoice #${invoiceNumber} with a total of ${calculateTotal()} KSH. View details: [Link to your website or PDF]`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="invoice-container">
      <div id="invoice" className="invoice">
        <div className="header">
          <div className="company-info">
            <h2>{companyName}</h2>
            <p>{companyAddress}</p>
            <p>Phone: {companyPhone}</p>
            <p>Email: {companyEmail}</p>
          </div>
          <div className="invoice-header">
            <img src="/images/logo2.png" alt="YareFarm Logo" className="company-logo" />
            <h2 className="invoice-title">INVOICE</h2>
          </div>
        </div>
        <div className="invoice-details">
          <div className="invoice-no">
            <label>Invoice NO:</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="Invoice #"
            />
          </div>
          <div className="dates">
            <label>Date:</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
            <label>Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="bill-to">
          <h3>BILLED TO:</h3>
          <div className="recipient-field">
            <label>Name:</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>
          <div className="recipient-field">
            <label>Address:</label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>
          <div className="recipient-field">
            <label>Phone:</label>
            <input
              type="text"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
            />
          </div>
        </div>
        <table className="items-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>DESCRIPTION</th>
              <th>QUANTITY</th>
              <th>UNIT PRICE (KSH)</th>
              <th>TOTAL (KSH)</th>
              <th className="print-hide">Select</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.sn}>
                <td>{item.sn}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}</td>
                <td>{item.total}</td>
                <td className="print-hide">
                  <input
                    type="checkbox"
                    checked={item.selected || false}
                    onChange={() => handleItemSelect(index)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td>{items.length + 1}</td>
              <td>
                <input
                  type="text"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Description"
                  className="print-hide"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  placeholder="Quantity"
                  className="print-hide"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem({ ...newItem, unitPrice: e.target.value })}
                  placeholder="Unit Price"
                  className="print-hide"
                />
              </td>
              <td>{newItem.quantity * newItem.unitPrice || 0}</td>
              <td>
                <button onClick={addItem}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="total">TOTAL DUE: {calculateTotal()} KSH</div>
        <div className="thank-you">Thank you for doing business with us!</div>
        <img src="/images/sign.png" alt="Signature" className="signature-image" />
        <div className="signature-line">_________________________</div>
        <div className="signature">Jamal Dahir</div>
      </div>
      <div className="buttons">
        <button onClick={shareViaWhatsApp}>Share via WhatsApp</button>
        <button onClick={shareViaEmail}>Share via Email</button>
        <button onClick={refreshForm}>Refresh</button>
        <button onClick={deleteSelectedItems}>Delete Selected Items</button>
       
        <PDFDownloadLink document={<InvoicePDF />} fileName={`invoice_${invoiceNumber}.pdf`}>
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF (react-pdf)')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

// PDF Styles for react-pdf
const pdfStyles = PDFStyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica', fontSize: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  companyInfo: { fontSize: 15 },
  companyName: { fontSize: 18, fontWeight: 'bold' },
  companyAddress: { fontSize: 10 },
  companyContact: { fontSize: 10 },
  invoiceHeader: { textAlign: 'right' },
  logo: { width: 100, height: 50, marginBottom: 10 },
  invoiceTitle: { fontSize: 24, color: 'green', fontWeight: 'bold' },
  invoiceDetails: { marginBottom: 20 },
  billTo: { marginBottom: 20 },
  billToTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  table: { width: '100%', border: '1px solid #000' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f0f0f0', borderBottom: '1px solid #000' },
  tableRow: { flexDirection: 'row', borderBottom: '1px solid #000' },
  tableCell: { flex: 1, padding: 5, borderRight: '1px solid #000' },
  total: { marginTop: 20, fontSize: 14, fontWeight: 'bold' },
  thankYou: { marginTop: 20, fontSize: 12 },
  signatureImage: {
    width: 80,
    height: 'auto',
    marginTop: 10,
    marginBottom: 0,
  },
  signatureSection: { marginTop: 5, textAlign: 'left' },
  signatureLine: { fontSize: 12, marginBottom: 5 },
  signature: { fontSize: 12, fontStyle: 'italic' },
});

export default Invoice;