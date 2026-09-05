import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const education = pgTable('education', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  period: varchar('period', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  institution: varchar('institution', { length: 255 }).notNull(),
  description: text('description'),
  order: integer('order').default(10).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Education = typeof education.$inferSelect;
export type NewEducation = typeof education.$inferInsert;
