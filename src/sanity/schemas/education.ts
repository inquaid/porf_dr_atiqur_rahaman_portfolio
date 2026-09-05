import { defineType, defineField } from 'sanity';

export const educationType = defineType({
  name: 'education',
  title: 'Education Milestone',
  type: 'document',
  fields: [
    defineField({
      name: 'period',
      title: 'Time Period',
      type: 'string',
      placeholder: 'e.g. 2023 - Present',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Degree / Certificate / Level',
      type: 'string',
      placeholder: 'e.g. BSc in Computer Science',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institution / College / School',
      type: 'string',
      placeholder: 'e.g. Khulna University, Bangladesh',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description / Notes',
      type: 'text',
      rows: 3,
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
      subtitle: 'institution',
    },
  },
});
