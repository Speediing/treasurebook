import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'fullWidthImage',
  title: 'Full Width Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),

    {
      title: 'Image',
      name: 'image',
      type: 'image'
    }
  ]
});
