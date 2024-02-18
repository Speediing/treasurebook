import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  perspective: "published",

  stega: {
    enabled: process.env.VERCEL_ENV === 'preview', // this can also be controlled in `client.fetch(query, params, {stega: boolean})`
    studioUrl: '/admin', // Or: 'https://my-cool-project.sanity.studio'
  },
});
