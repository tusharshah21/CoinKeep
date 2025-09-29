import React from 'react';
import Panel from '../components/Panel';

const Dashboard = () => (
  <div className="ck-panel-grid">
    <Panel title="Total Volume (30d)">$2.4M</Panel>
    <Panel title="Tx Count (30d)">1,247</Panel>
    <Panel title="Avg Fee">$12.50</Panel>
    <Panel title="Active Chains">8</Panel>
    <div className="ck-full">
      <Panel title="Recent Cross-Chain Payments">
        <table className="ck-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>From Chain</th>
              <th>To Chain</th>
              <th>Token</th>
              <th>Amount</th>
              <th>Recipient</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-09-28 14:30</td>
              <td>Ethereum</td>
              <td>Polygon</td>
              <td>USDC</td>
              <td>1,000</td>
              <td>0x1234...abcd</td>
              <td><span className="ck-status success">Completed</span></td>
            </tr>
            <tr>
              <td>2025-09-28 13:15</td>
              <td>BSC</td>
              <td>Avalanche</td>
              <td>USDT</td>
              <td>500</td>
              <td>0x5678...efgh</td>
              <td><span className="ck-status pending">Pending</span></td>
            </tr>
            <tr>
              <td>2025-09-28 12:00</td>
              <td>Arbitrum</td>
              <td>Optimism</td>
              <td>ETH</td>
              <td>0.5</td>
              <td>0x9abc...1234</td>
              <td><span className="ck-status success">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </div>
  </div>
);

export default Dashboard;