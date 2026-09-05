import { defineType, defineField } from 'sanity';

export const activityType = defineType({
  name: 'activity',
  title: 'Extracurricular Activity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Activity Title',
      type: 'string',
      placeholder: 'e.g. TEDx or Competitive Programming',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconKey',
      title: 'Icon Identifier',
      type: 'string',
      description: 'Icon key for dynamic icon mapping (e.g. rocket, code, trophy, users, palette)',
      placeholder: 'e.g. rocket or code',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Time Period / Year',
      type: 'string',
      placeholder: 'e.g. 2024 or 2024 - Present',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 10,
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
      subtitle: 'date',
    },
  },
});
