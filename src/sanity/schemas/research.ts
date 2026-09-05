import { defineType, defineField } from 'sanity';

export const researchType = defineType({
  name: 'research',
  title: 'Research & Publications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Paper / Research Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'conference',
      title: 'Conference / Journal / Publisher',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Publication Year / Date',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'pdfUrl',
      title: 'PDF / Paper Link',
      type: 'url',
    }),
    defineField({
      name: 'doi',
      title: 'DOI / Citation ID',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'conference',
    },
  },
});
