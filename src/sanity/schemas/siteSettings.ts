import { defineType, defineField } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings & SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Azmain Inquaid Haque',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      initialValue: 'https://azmaininquaid.mind-byte.com',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Official portfolio of Azmain Inquaid Haque – Researcher specializing in AI/ML, UI/UX design, React, Node.js, and competitive problem solving. Based in Khulna, Bangladesh.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'siteImage',
      title: 'Default Share / OG Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoInitials',
      title: 'Logo Initials (Splash Screen)',
      type: 'string',
      initialValue: 'AI',
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter / X Handle',
      type: 'string',
      initialValue: '@azmain_inquaid',
    }),
    defineField({
      name: 'themeColor',
      title: 'Primary Theme Color',
      type: 'string',
      initialValue: '#6366f1',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'siteUrl',
      media: 'siteImage',
    },
  },
});
