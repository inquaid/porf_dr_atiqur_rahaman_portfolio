import { defineType, defineField } from 'sanity';

export const socialLinkType = defineType({
  name: 'socialLink',
  title: 'Social & Profile Link',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'GitHub', value: 'GitHub' },
          { title: 'LinkedIn', value: 'LinkedIn' },
          { title: 'Twitter / X', value: 'Twitter' },
          { title: 'Facebook', value: 'Facebook' },
          { title: 'Instagram', value: 'Instagram' },
          { title: 'YouTube', value: 'YouTube' },
          { title: 'Email', value: 'Email' },
          { title: 'ResearchGate', value: 'ResearchGate' },
          { title: 'Codeforces', value: 'Codeforces' },
          { title: 'CodeChef', value: 'CodeChef' },
          { title: 'AtCoder', value: 'AtCoder' },
          { title: 'LeetCode', value: 'LeetCode' },
          { title: 'Google Drive', value: 'GoogleDrive' },
          { title: 'Other / Website', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Display Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Destination URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto'],
        }).required(),
    }),
    defineField({
      name: 'section',
      title: 'Display Section',
      type: 'string',
      options: {
        list: [
          { title: 'Home Section Only', value: 'home' },
          { title: 'Contact Section Only', value: 'contact' },
          { title: 'Both Home & Contact Sections', value: 'both' },
        ],
      },
      initialValue: 'both',
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
      title: 'platform',
      subtitle: 'url',
    },
  },
});
