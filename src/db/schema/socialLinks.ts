import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const socialLinks = pgTable('social_links', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  platform: varchar('platform', { length: 100 }).notNull(),
  label: varchar('label', { length: 100 }).notNull(),
  url: text('url').notNull(),
  section: varchar('section', { length: 50 }).default('both').notNull(),
  order: integer('order').default(10).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type SocialLink = typeof socialLinks.$inferSelect;
export type NewSocialLink = typeof socialLinks.$inferInsert;
