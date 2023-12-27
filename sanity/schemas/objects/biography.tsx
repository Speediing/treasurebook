import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'biography',
  title: 'Biography',
  type: 'object',
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
    },
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body'
    })
  ]
});
