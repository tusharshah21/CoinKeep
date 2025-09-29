import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';

const Login = () => {
  const { signInWithWallet } = useAuth();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not installed');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log('Provider created:', provider);
      const accounts = await provider.send('eth_requestAccounts', []);
      console.log('Accounts:', accounts);
      const address = ethers.getAddress(accounts[0]);
      console.log('Address from accounts:', address);
      const signer = await provider.getSigner(address);
      console.log('Signer obtained:', signer);
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      console.log('Chain ID:', chainId);
      setAddress(address);

      // Create SIWE message
      const domain = window.location.hostname === 'localhost' ? '127.0.0.1' : window.location.host;
      const uri = window.location.origin.replace('localhost', '127.0.0.1');
      const message = new SiweMessage({
        domain,
        address,
        statement: 'Sign in to CoinKeep with Ethereum.',
        uri,
        version: '1',
        chainId,
        nonce: Math.random().toString(36).substring(2),
      });

      const messageText = message.prepareMessage();
      console.log('SIWE message:', messageText);
      const signature = await signer.signMessage(messageText);
      console.log('Signature obtained');

      setLoading(true);
      await signInWithWallet(address, signature, messageText);
      console.log('Login successful');
    } catch (e) {
      console.error('SIWE error:', e);
      alert('SIWE error: ' + e.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ck-auth-wrapper">
      <div className="ck-auth-form">
        <h1>Sign in to CoinKeep</h1>
        <button onClick={connectWallet} disabled={loading}>
          {loading ? 'Signing in...' : 'Connect Wallet'}
        </button>
        {address && <p>Connected: {address}</p>}
        <p className="ck-auth-note">Connect your Ethereum wallet to login.</p>
      </div>
    </div>
  );
};

export default Login;