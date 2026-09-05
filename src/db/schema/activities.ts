import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const activities = pgTable('activities', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  iconKey: varchar('icon_key', { length: 100 }).notNull(),
  date: varchar('date', { length: 100 }).notNull(),
  order: integer('order').default(10).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;
