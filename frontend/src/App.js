import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './components/Login';

const AppInner = () => {
  const { user, logout } = useAuth();
  const [current, setCurrent] = useState('Dashboard');
  if (!user) return <Login />;
  return <Layout current={current} setCurrent={setCurrent} logout={logout} org={user.user_metadata?.address || 'Wallet User'} />;
};

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;
