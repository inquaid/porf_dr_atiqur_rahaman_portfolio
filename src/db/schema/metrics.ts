import { pgTable, uuid, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const metrics = pgTable('metrics', {
  id: uuid('id').defaultRandom().primaryKey(),
  itemSlug: varchar('item_slug', { length: 255 }).notNull().unique(),
  itemType: varchar('item_type', { length: 50 }).default('post').notNull(), // 'post' | 'project' | 'research'
  viewsCount: integer('views_count').default(0).notNull(),
  likesCount: integer('likes_count').default(0).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Metric = typeof metrics.$inferSelect;
export type NewMetric = typeof metrics.$inferInsert;
