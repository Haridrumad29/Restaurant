import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function QRGenerator() {
  const [qrData, setQrData] = useState({
    type: 'menu',
    tableNumber: '',
    url: window.location.origin
  });

  const [generatedQRs, setGeneratedQRs] = useState([]);

  const generateQR = () => {
    let qrUrl = qrData.url;
    if (qrData.type === 'table' && qrData.tableNumber) {
      qrUrl = `${qrData.url}?table=${qrData.tableNumber}`;
    }

    const newQR = {
      id: Date.now(),
      type: qrData.type,
      tableNumber: qrData.tableNumber,
      url: qrUrl,
      createdAt: new Date().toLocaleString()
    };

    setGeneratedQRs([...generatedQRs, newQR]);
  };

  const downloadQR = (id) => {
    const canvas = document.getElementById(`qr-${id}`);
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-code-${id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="qr-generator">
      <h1>QR Code Generator</h1>

      <div className="qr-form-section">
        <h2>Generate New QR Code</h2>
        <div className="form-group">
          <label>QR Code Type</label>
          <select 
            value={qrData.type}
            onChange={(e) => setQrData({ ...qrData, type: e.target.value })}
          >
            <option value="menu">Full Menu</option>
            <option value="table">Table Specific</option>
          </select>
        </div>

        {qrData.type === 'table' && (
          <div className="form-group">
            <label>Table Number</label>
            <input
              type="text"
              value={qrData.tableNumber}
              onChange={(e) => setQrData({ ...qrData, tableNumber: e.target.value })}
              placeholder="Enter table number"
            />
          </div>
        )}

        <button onClick={generateQR} className="generate-btn">
          Generate QR Code
        </button>
      </div>

      <div className="generated-qrs">
        <h2>Generated QR Codes</h2>
        <div className="qr-grid">
          {generatedQRs.map(qr => (
            <div key={qr.id} className="qr-card">
              <QRCodeCanvas
                id={`qr-${qr.id}`}
                value={qr.url}
                size={200}
                level="H"
                includeMargin={true}
              />
              <div className="qr-info">
                <p><strong>Type:</strong> {qr.type}</p>
                {qr.tableNumber && <p><strong>Table:</strong> {qr.tableNumber}</p>}
                <p><strong>Created:</strong> {qr.createdAt}</p>
              </div>
              <button onClick={() => downloadQR(qr.id)} className="download-btn">
                Download PNG
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QRGenerator;
