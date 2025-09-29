import React, { useState } from 'react';

const Batch = () => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // TODO: Handle file upload
      alert('File uploaded! (Processing pending)');
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      alert('File selected! (Processing pending)');
    }
  };

  return (
    <div>
      <h2>Batch Cross-Chain Transfers</h2>
      <p>Upload CSV or JSON file with payment details for bulk cross-chain transfers.</p>
      <div 
        className={`ck-upload-zone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <div className="ck-upload-content">
          <div className="ck-upload-icon">📁</div>
          <p>Drop your CSV/JSON file here or click to browse</p>
          <small>Supported formats: CSV, JSON</small>
        </div>
        <input 
          id="file-input" 
          type="file" 
          accept=".csv,.json" 
          onChange={handleFileSelect} 
          style={{display: 'none'}} 
        />
      </div>
      <div className="ck-batch-info">
        <h4>CSV Format Example:</h4>
        <pre>
{`recipient,amount,token,destChain
0x1234...abcd,100,USDC,polygon
0x5678...efgh,50,USDT,bsc`}
        </pre>
      </div>
      <h3 style={{marginTop:'2rem'}}>Batch History</h3>
      <table className="ck-table">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>File</th>
            <th>Entries</th>
            <th>Submitted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BATCH-001</td>
            <td>payroll-sep.csv</td>
            <td>25</td>
            <td>2025-09-28 10:00</td>
            <td><span className="ck-status processing">Processing</span></td>
          </tr>
          <tr>
            <td>BATCH-002</td>
            <td>settlements-aug.json</td>
            <td>12</td>
            <td>2025-09-15 14:30</td>
            <td><span className="ck-status success">Completed</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Batch;