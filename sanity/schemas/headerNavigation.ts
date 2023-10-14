import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'headerNavigation',
  title: 'Header Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),
    {
      title: 'Logo',
      name: 'logo',
      type: 'image'
    },
    {
      title: 'Nav Options',
      name: 'napOptions',
      type: 'array',
      of: [{ type: 'navOption' }]
    }
  ]
});
