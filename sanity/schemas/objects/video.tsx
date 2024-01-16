import { defineType } from 'sanity';

export default defineType({
  title: 'Video Header',
  name: 'videoHeader',
  type: 'object',
  fields: [
    { title: 'Title', name: 'title', type: 'string' },
    {
      title: 'Video file',
      name: 'video',
      type: 'mux.video'
    }
  ]
});
