import { pgTable, uuid, text, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  address: text('address').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const merchants = pgTable('merchants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  walletAddress: text('wallet_address').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  merchantId: uuid('merchant_id').references(() => merchants.id).notNull(),
  recipientAddress: text('recipient_address').notNull(),
  amount: decimal('amount').notNull(),
  tokenSymbol: text('token_symbol').notNull(),
  network: text('network').notNull(),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const batchRequests = pgTable('batch_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  merchantId: uuid('merchant_id').references(() => merchants.id).notNull(),
  batchJson: jsonb('batch_json').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});