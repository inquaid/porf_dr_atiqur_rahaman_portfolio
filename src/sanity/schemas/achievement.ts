import { defineType, defineField } from 'sanity';

export const achievementType = defineType({
  name: 'achievement',
  title: 'Achievement & Contest Participation',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Achievement Type',
      type: 'string',
      options: {
        list: [
          { title: 'Coding Platform Profile (e.g. Codeforces, LeetCode)', value: 'platform' },
          { title: 'Contest / Award Participation (e.g. IUPC, Hackathons)', value: 'contest' },
        ],
        layout: 'radio',
      },
      initialValue: 'platform',
      validation: (Rule) => Rule.required(),
    }),
    // Platform fields
    defineField({
      name: 'platformName',
      title: 'Platform Name',
      type: 'string',
      placeholder: 'e.g. Codeforces, CodeChef, LeetCode, AtCoder',
      hidden: ({ document }) => document?.type !== 'platform',
    }),
    defineField({
      name: 'account',
      title: 'Account Handle / Username',
      type: 'string',
      placeholder: 'e.g. luffy_18',
      hidden: ({ document }) => document?.type !== 'platform',
    }),
    defineField({
      name: 'accountUrl',
      title: 'Profile URL',
      type: 'url',
      hidden: ({ document }) => document?.type !== 'platform',
    }),
    defineField({
      name: 'highestRating',
      title: 'Highest Rating / Tier',
      type: 'string',
      placeholder: 'e.g. Specialist (1406) or 3★ (1653)',
      hidden: ({ document }) => document?.type !== 'platform',
    }),
    defineField({
      name: 'solveCount',
      title: 'Problems Solved',
      type: 'string',
      placeholder: 'e.g. 700+ problems',
      hidden: ({ document }) => document?.type !== 'platform',
    }),
    defineField({
      name: 'contestCount',
      title: 'Contest Count / Activity',
      type: 'string',
      placeholder: 'e.g. 50+ contests',
      hidden: ({ document }) => document?.type !== 'platform',
    }),
    // Contest fields
    defineField({
      name: 'contestName',
      title: 'Contest / Competition Name',
      type: 'string',
      placeholder: 'e.g. UIHP-IC4 or KRIUPC',
      hidden: ({ document }) => document?.type !== 'contest',
    }),
    defineField({
      name: 'date',
      title: 'Event Date / Year',
      type: 'string',
      placeholder: 'e.g. July 16, 2025',
      hidden: ({ document }) => document?.type !== 'contest',
    }),
    defineField({
      name: 'result',
      title: 'Result / Standing',
      type: 'string',
      placeholder: 'e.g. 1st Place or 40th Place',
      hidden: ({ document }) => document?.type !== 'contest',
    }),
    defineField({
      name: 'description',
      title: 'Team / Project Description',
      type: 'string',
      placeholder: 'e.g. Team Name: Pulsy Drive',
      hidden: ({ document }) => document?.type !== 'contest',
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
      type: 'type',
      platformName: 'platformName',
      contestName: 'contestName',
      account: 'account',
      result: 'result',
    },
    prepare(selection) {
      const { type, platformName, contestName, account, result } = selection;
      if (type === 'contest') {
        return {
          title: contestName || 'Contest Participation',
          subtitle: result || 'Result',
        };
      }
      return {
        title: platformName || 'Coding Platform',
        subtitle: account ? `@${account}` : 'Platform Profile',
      };
    },
  },
});
