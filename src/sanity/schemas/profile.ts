import { defineType, defineField } from 'sanity';

export const profileType = defineType({
  name: 'profile',
  title: 'Personal Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Short Name (Sidebar & Display)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Picture / Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / Homepage Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'typewriterTitles',
      title: 'Animated Typewriter Titles',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'heroBio',
      title: 'Hero Section Bio',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutParagraphs',
      title: 'About Section Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    }),
    defineField({
      name: 'infoGrid',
      title: 'Info Summary Grid',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Display Name', type: 'string' }),
        defineField({ name: 'email', title: 'Email Address', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
        defineField({ name: 'field', title: 'Domain / Field', type: 'string' }),
      ],
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume / CV PDF Document',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'resumeFileName',
      title: 'Resume Download Filename',
      type: 'string',
    }),
    defineField({
      name: 'driveUrl',
      title: 'Google Drive Portfolio Folder URL',
      type: 'url',
    }),
    defineField({
      name: 'drivePassword',
      title: 'Google Drive Access Password',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'shortName',
      media: 'profileImage',
    },
  },
});
