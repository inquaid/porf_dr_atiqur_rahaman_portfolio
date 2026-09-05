import { pgTable, uuid, varchar, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const research = pgTable('research', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  conference: varchar('conference', { length: 255 }).notNull(),
  year: varchar('year', { length: 50 }).notNull(),
  abstract: text('abstract').notNull(),
  authors: jsonb('authors').$type<string[]>(),
  pdfUrl: text('pdf_url'),
  doi: varchar('doi', { length: 255 }),
  order: integer('order').default(10).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type ResearchItem = typeof research.$inferSelect;
export type NewResearchItem = typeof research.$inferInsert;
