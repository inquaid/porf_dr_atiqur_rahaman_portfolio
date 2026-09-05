import { pgTable, uuid, varchar, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export interface SkillItemData {
  name: string;
  iconKey: string;
  level?: string;
  years?: string;
}

export const skillCategories = pgTable('skill_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  sanityId: varchar('sanity_id', { length: 255 }).unique().notNull(),
  categoryId: varchar('category_id', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  order: integer('order').default(10).notNull(),
  skills: jsonb('skills').$type<SkillItemData[]>().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type SkillCategory = typeof skillCategories.$inferSelect;
export type NewSkillCategory = typeof skillCategories.$inferInsert;
