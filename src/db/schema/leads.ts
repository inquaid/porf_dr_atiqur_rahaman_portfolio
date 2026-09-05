import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).default('new').notNull(), // 'new' | 'contacted' | 'archived'
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
