import { defineType, defineField } from 'sanity';

export const experienceType = defineType({
  name: 'experience',
  title: 'Work & Volunteer Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'period',
      title: 'Time Period',
      type: 'string',
      placeholder: 'e.g. Fall 2024 or 2022 - Present',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job / Role Title',
      type: 'string',
      placeholder: 'e.g. Creative Designer or Software Engineer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Organization / Company / Location',
      type: 'string',
      placeholder: 'e.g. TEDx Khulna University',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description of Responsibilities & Achievements',
      type: 'text',
      rows: 3,
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
      subtitle: 'location',
    },
  },
});
