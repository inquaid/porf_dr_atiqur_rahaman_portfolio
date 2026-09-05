import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const achievements = pgTable('achievements', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'platform' | 'contest'
  platformName: varchar('platform_name', { length: 100 }),
  account: varchar('account', { length: 100 }),
  accountUrl: text('account_url'),
  highestRating: varchar('highest_rating', { length: 100 }),
  solveCount: varchar('solve_count', { length: 100 }),
  contestCount: varchar('contest_count', { length: 100 }),
  contestName: varchar('contest_name', { length: 255 }),
  date: varchar('date', { length: 100 }),
  result: varchar('result', { length: 100 }),
  description: text('description'),
  order: integer('order').default(10).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type NewAchievement = typeof achievements.$inferInsert;
