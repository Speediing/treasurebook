import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug'
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [
        defineArrayMember({
          name: 'fullWidthImage',
          type: 'fullWidthImage'
        }),
        defineArrayMember({
          name: 'splitSmallText',
          type: 'splitSmallText'
        })
      ]
    })
  ]
});
