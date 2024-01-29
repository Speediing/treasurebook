import { defineField } from 'sanity';

export default defineField({
  name: 'product.descriptionTab',
  title: 'Product Description Tab',
  type: 'object',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    // Content
    defineField({
      name: 'body',
      title: 'Body',
      type: 'product.descriptionTabBody'
    })
  ]
});
