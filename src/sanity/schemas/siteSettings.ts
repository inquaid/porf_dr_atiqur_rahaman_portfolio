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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
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
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter / X Handle',
      type: 'string',
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
