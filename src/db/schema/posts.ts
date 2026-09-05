import { pgTable, uuid, varchar, text, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  author: varchar('author', { length: 255 }).default('').notNull(),
  imageUrl: text('image_url'),
  category: varchar('category', { length: 100 }).notNull(),
  tags: jsonb('tags').$type<string[]>(),
  publishedAt: timestamp('published_at', { withTimezone: true }).defaultNow().notNull(),
  excerpt: text('excerpt').notNull(),
  featured: boolean('featured').default(false).notNull(),
  body: jsonb('body').$type<any[]>(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
