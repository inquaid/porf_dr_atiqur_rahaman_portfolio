import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const siteSettings = pgTable('site_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  siteName: varchar('site_name', { length: 255 }).notNull(),
  siteUrl: varchar('site_url', { length: 500 }).notNull(),
  siteDescription: text('site_description'),
  siteKeywords: jsonb('site_keywords').$type<string[]>(),
  siteImageUrl: text('site_image_url'),
  logoInitials: varchar('logo_initials', { length: 50 }),
  twitterHandle: varchar('twitter_handle', { length: 100 }),
  themeColor: varchar('theme_color', { length: 50 }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type SiteSettings = typeof siteSettings.$inferSelect;
export type NewSiteSettings = typeof siteSettings.$inferInsert;
