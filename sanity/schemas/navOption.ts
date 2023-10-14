import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'navOption',
  title: 'Navigation Option',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),
    {
      title: 'Path',
      name: 'path',
      type: 'slug'
    }
  ]
});
