import React from 'react';
import Panel from '../components/Panel';

const Billing = () => (
  <div>
    <h2>Billing & Usage</h2>
    <div className="ck-panel-grid">
      <Panel title="Current Plan">Pro</Panel>
      <Panel title="Monthly Volume">$45,230</Panel>
      <Panel title="Remaining Quota">12,450 tx</Panel>
    </div>
    <h3>Invoices</h3>
    <table className="ck-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Invoice #</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2025-09-01</td>
          <td>INV-2025-09</td>
          <td>$299.00</td>
          <td><span className="ck-status success">Paid</span></td>
        </tr>
        <tr>
          <td>2025-08-01</td>
          <td>INV-2025-08</td>
          <td>$299.00</td>
          <td><span className="ck-status success">Paid</span></td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Billing;