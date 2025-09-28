import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';
// import { db } from './db';
// import { profiles, batchRequests } from './schema';
// import { eq } from 'drizzle-orm';
import { SiweMessage } from 'siwe';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'CoinKeep API is running!', status: 'OK' });
});

let supabase;
try {
  supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
} catch (error) {
  process.exit(1);
}

app.post('/auth/wallet-login', async (req, res) => {
  const { address, signature, messageText }: { address: string; signature: string; messageText: string } = req.body;
  if (!address || !signature || !messageText) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    // Parse the SIWE message
    const message = new SiweMessage(messageText);
    // Verify the message
    const verified = await message.verify({ signature });
    console.log('SIWE verification result:', verified);
    if (!verified.success) {
      console.log('SIWE verification failed:', verified.error);
      return res.status(401).json({ error: 'Invalid SIWE signature' });
    }
    const email = `${address}@wallet.local`;
    const password = 'securepassword123'; // Fixed password for wallet users

    // Try to sign in
    let { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !signInData?.session) {
      // User doesn't exist, create
      const { error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { address },
        email_confirm: true,
      });
      if (createError) {
        throw createError;
      }

      // Now sign in
      const { data: newSignInData, error: newSignInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (newSignInError || !newSignInData?.session) {
        console.log('New sign in error:', newSignInError);
        throw newSignInError || new Error('Failed to sign in');
      }
      signInData = newSignInData;
    }

    // Ensure profile exists using Drizzle
    // if (signInData?.user) {
    //   const existingProfile = await db.select().from(profiles).where(eq(profiles.id, signInData.user.id)).limit(1);
    //   if (existingProfile.length === 0) {
    //     await db.insert(profiles).values({ id: signInData.user.id, address });
    //   }
    // }

    if (!signInData?.session) throw new Error('No session');

    res.json({
      access_token: signInData.session.access_token,
      refresh_token: signInData.session.refresh_token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/batch-payments/:merchantId', async (req, res) => {
  const { merchantId } = req.params;
  // try {
  //   const data = await db.select().from(batchRequests).where(eq(batchRequests.merchantId, merchantId));
  //   res.json(data);
  // } catch (error: any) {
  //   res.status(500).json({ error: error.message });
  // }
  res.json([]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});