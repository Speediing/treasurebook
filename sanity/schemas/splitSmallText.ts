import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'splitSmallText',
  title: 'Split Small Text',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),
    {
      title: 'Left Items',
      name: 'leftItems',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      title: 'Right Items',
      name: 'rightItems',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
});
