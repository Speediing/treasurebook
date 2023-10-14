import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'footerNavigation',
  title: 'Footer Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    })
  ]
});
