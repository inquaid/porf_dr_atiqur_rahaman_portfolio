import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'oxu258yz';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
