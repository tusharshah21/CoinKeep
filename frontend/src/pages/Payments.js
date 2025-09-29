import React, { useState } from 'react';

const Payments = () => {
  const [formData, setFormData] = useState({
    sourceChain: 'ethereum',
    destChain: 'polygon',
    token: 'USDC',
    amount: '',
    recipient: '',
    bridge: 'lifi'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with bridge API
    alert('Payment initiated! (Integration pending)');
  };

  return (
    <div>
      <h2>Initiate Cross-Chain Payment</h2>
      <form className="ck-form" onSubmit={handleSubmit}>
        <div className="ck-form-row">
          <label>
            Source Chain
            <select name="sourceChain" value={formData.sourceChain} onChange={handleChange}>
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="bsc">BSC</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="optimism">Optimism</option>
              <option value="avalanche">Avalanche</option>
            </select>
          </label>
          <label>
            Destination Chain
            <select name="destChain" value={formData.destChain} onChange={handleChange}>
              <option value="polygon">Polygon</option>
              <option value="ethereum">Ethereum</option>
              <option value="bsc">BSC</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="optimism">Optimism</option>
              <option value="avalanche">Avalanche</option>
            </select>
          </label>
        </div>
        <div className="ck-form-row">
          <label>
            Token
            <select name="token" value={formData.token} onChange={handleChange}>
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
              <option value="ETH">ETH</option>
              <option value="WBTC">WBTC</option>
            </select>
          </label>
          <label>
            Amount
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0.00" required />
          </label>
        </div>
        <label>
          Recipient Address
          <input type="text" name="recipient" value={formData.recipient} onChange={handleChange} placeholder="0x..." required />
        </label>
        <label>
          Bridge Provider
          <select name="bridge" value={formData.bridge} onChange={handleChange}>
            <option value="lifi">LiFi</option>
            <option value="socket">Socket</option>
            <option value="connext">Connext</option>
          </select>
        </label>
        <button type="submit" className="ck-btn-primary">Initiate Payment</button>
      </form>
      <h3 style={{marginTop:'2rem'}}>Recent Payments</h3>
      <table className="ck-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>From</th>
            <th>To</th>
            <th>Token</th>
            <th>Amount</th>
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
            <td><span className="ck-status success">Completed</span></td>
          </tr>
          <tr>
            <td>2025-09-28 13:15</td>
            <td>BSC</td>
            <td>Avalanche</td>
            <td>USDT</td>
            <td>500</td>
            <td><span className="ck-status pending">Pending</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Payments;