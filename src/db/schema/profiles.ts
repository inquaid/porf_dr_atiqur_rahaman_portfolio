import { pgTable, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  shortName: varchar('short_name', { length: 255 }).notNull(),
  profileImageUrl: text('profile_image_url'),
  heroImageUrl: text('hero_image_url'),
  typewriterTitles: jsonb('typewriter_titles').$type<string[]>().notNull(),
  heroBio: text('hero_bio').notNull(),
  aboutParagraphs: jsonb('about_paragraphs').$type<string[]>().notNull(),
  infoGrid: jsonb('info_grid').$type<{
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    field?: string;
  }>(),
  resumeFileUrl: text('resume_file_url'),
  resumeFileName: varchar('resume_file_name', { length: 255 }),
  driveUrl: text('drive_url'),
  drivePassword: varchar('drive_password', { length: 100 }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
