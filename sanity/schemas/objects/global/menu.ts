import { defineField } from 'sanity';

export default defineField({
  name: 'menuSettings',
  title: 'Menu',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true
  },
  fields: [
    // Links
    {
      title: 'Logo',
      name: 'logo',
      type: 'image'
    },
    defineField({
      name: 'links',
      title: 'Links',
      type: 'menuLinks'
    })
  ]
});
