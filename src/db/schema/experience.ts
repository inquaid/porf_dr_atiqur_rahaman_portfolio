import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const experience = pgTable('experience', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  period: varchar('period', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  description: text('description').notNull(),
  order: integer('order').default(10).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Experience = typeof experience.$inferSelect;
export type NewExperience = typeof experience.$inferInsert;
