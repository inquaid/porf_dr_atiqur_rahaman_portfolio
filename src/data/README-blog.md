Blog posts via Markdown

How to add a post (1–2 line edit):

1) Drop a Markdown file into public/blog, e.g., public/blog/my-new-post.md
2) Open src/data/blogPosts.ts and add one of these lines to blogPostRegistry:

- Minimal (title/slug derived from filename, defaults provided):
  'my-new-post.md',

- With overrides:
  { file: 'my-new-post.md', excerpt: 'Short summary...', image: '/project2.png', featured: true }

Notes
- Filename becomes slug and default title (my-new-post -> "My New Post").
- Content is rendered GitHub-style with a lightweight parser; for full MD features, we can switch to a library.
- Images referenced with absolute paths (e.g., /project3.png) should live under public/.
