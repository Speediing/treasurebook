import { DocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineField } from 'sanity';

import { validateSlug } from '../../utils/validateSlug';

export default defineField({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial'
    },
    {
      name: 'seo',
      title: 'SEO'
    }
  ],
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    // Slug
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      // @ts-ignore - TODO - fix this TS error
      validation: validateSlug
    }),
    // Color theme

    // Show hero

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.page',
      group: 'seo'
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      group: 'editorial',
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
  ],
  preview: {
    select: {
      active: 'active',
      seoImage: 'seo.image',
      title: 'title'
    },
    prepare(selection) {
      const { seoImage, title } = selection;

      return {
        media: seoImage,
        title
      };
    }
  }
});
