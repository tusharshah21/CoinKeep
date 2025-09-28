import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithWallet = async (address, signature, messageText) => {
    console.log('Sending wallet login request to backend');
    const response = await fetch('http://localhost:3001/auth/wallet-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, signature, messageText }),
    });
    console.log('Response received, status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    if (!response.ok) throw new Error(data.error || 'Login failed');
    console.log('Setting Supabase session');
    await supabase.auth.setSession({ access_token: data.access_token, refresh_token: data.refresh_token });
    console.log('Session set successfully');
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    loading,
    signInWithWallet,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};