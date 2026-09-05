import { defineType, defineField } from 'sanity';

export const skillCategoryType = defineType({
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryId',
      title: 'Category Identifier (Slug / ID)',
      type: 'string',
      placeholder: 'e.g. programming, frontend, backend, ml',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      placeholder: 'e.g. Programming Languages, Frontend Development',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'skills',
      title: 'Skills List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'skillItem',
          title: 'Skill Item',
          fields: [
            defineField({
              name: 'name',
              title: 'Skill Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'iconKey',
              title: 'Icon Identifier',
              type: 'string',
              description: 'Icon key for dynamic icon mapping (e.g. python, cpp, java, react, html, css, docker, sql, git, linux)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'level',
              title: 'Proficiency Percentage',
              type: 'string',
              placeholder: 'e.g. 85% or 90%',
              initialValue: '85%',
            }),
            defineField({
              name: 'years',
              title: 'Experience Duration',
              type: 'string',
              placeholder: 'e.g. 3+ years or 2+ years',
              initialValue: '2+ years',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'level',
            },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order, Asc',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'categoryId',
    },
  },
});
