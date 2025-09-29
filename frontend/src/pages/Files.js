import React from 'react';

const Files = () => (
  <div>
    <h2>Managed Files</h2>
    <p>Securely stored payout templates and previously uploaded batch source files.</p>
    <ul className="ck-file-list">
      <li>payroll-sep.csv (Uploaded: 2025-09-28)</li>
      <li>settlements-aug.json (Uploaded: 2025-09-15)</li>
      <li>template-usdc-polygon.csv (Template)</li>
    </ul>
  </div>
);

export default Files;