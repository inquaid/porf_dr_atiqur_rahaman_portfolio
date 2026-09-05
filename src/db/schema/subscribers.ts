import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const subscribers = pgTable('subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  status: varchar('status', { length: 50 }).default('subscribed').notNull(), // 'subscribed' | 'unsubscribed'
  source: varchar('source', { length: 100 }).default('website'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;
