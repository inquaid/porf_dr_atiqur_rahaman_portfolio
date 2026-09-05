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
      initialValue: 'Azmain Inquaid Haque',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Short Name (Sidebar & Display)',
      type: 'string',
      initialValue: 'Azmain Inquaid',
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
      initialValue: [
        'Learner & Problem Solver',
        'Researcher',
        'AI/ML Enthusiast',
        'Competitive Programmer',
        'Tech Explorer',
      ],
    }),
    defineField({
      name: 'heroBio',
      title: 'Hero Section Bio',
      type: 'text',
      rows: 4,
      initialValue:
        "I'm currently pursuing a BSc at Khulna University with a strong passion for problem solving and emerging technologies. My interests lie in Artificial Intelligence, Machine Learning, and Robotics. I enjoy tackling real-world challenges through code and constantly seek opportunities to learn and build innovative solutions.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutParagraphs',
      title: 'About Section Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      initialValue: [
        "I'm a driven Computer Science and Engineering student at Khulna University with hands-on expertise spanning robotics (Arduino), AI/ML, software development, and creative digital design. My passion lies in building impactful technology solutions that bridge hardware and software to solve real-world challenges.",
        "Through academic projects and self-driven exploration, I've cultivated a versatile skill set—from programming and electronics to multimedia tools like Photoshop, Illustrator, and Premiere Pro. I thrive in collaborative environments and constantly seek new domains to innovate in, whether it's intelligent systems or interactive digital experiences.",
      ],
    }),
    defineField({
      name: 'infoGrid',
      title: 'Info Summary Grid',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Display Name', type: 'string', initialValue: 'Azmain Inquaid Haque' }),
        defineField({ name: 'email', title: 'Email Address', type: 'string', initialValue: 'azmaininquaidhaque@gmail.com' }),
        defineField({ name: 'phone', title: 'Phone Number', type: 'string', initialValue: '+8801320356909' }),
        defineField({ name: 'location', title: 'Location', type: 'string', initialValue: 'Khulna, Bangladesh' }),
        defineField({ name: 'field', title: 'Domain / Field', type: 'string', initialValue: 'Computer Science' }),
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
      initialValue: 'Resume_Azmain_Inquaid_Haque.pdf',
    }),
    defineField({
      name: 'driveUrl',
      title: 'Google Drive Portfolio Folder URL',
      type: 'url',
      initialValue: 'https://drive.google.com/drive/folders/1AjPKExOHfQOYoltJLqh_AyYTay3sRiMj?usp=drive_link',
    }),
    defineField({
      name: 'drivePassword',
      title: 'Google Drive Access Password',
      type: 'string',
      initialValue: '1234',
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
