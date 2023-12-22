import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

import { dataset, projectId } from '../env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || ''
});

export const urlForImage = (source: Image) => {
  const image = imageBuilder?.image(source).auto('format').fit('max');
  return image.url();
};
