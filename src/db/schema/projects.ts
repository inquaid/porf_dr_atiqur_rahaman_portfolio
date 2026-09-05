import { pgTable, uuid, varchar, text, boolean, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'),
  techStack: jsonb('tech_stack').$type<string[]>().notNull(),
  githubUrl: text('github_url'),
  liveUrl: text('live_url'),
  featured: boolean('featured').default(false).notNull(),
  order: integer('order').default(10).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
