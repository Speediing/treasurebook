import { groq } from 'next-sanity';
import { client } from '../client';
import { loadQuery } from '../store';

export const getPageBuilder = async (slug: string) => {
  const { data }: any = await loadQuery(
    groq`
    *[_type == "page" && slug.current == "${slug}"]{
    pageBuilder[]{
        (_type == "Video Header") => {
          _type,
   title,
    "playbackId": video.asset->playbackId
    },(_type == "fullWidthImage") => {
      _type,
  image
    },
    (_type == "splitSmallText") => {
      _type,
  leftItems,
    rightItems
    }, (_type == "Biography") => {
      _type,
      body,
  image,
    title
    },
    }
  }`,
    {},
    { cache: 'force-cache', next: { tags: [`page-${slug}`] } }
  );

  const pageContent = data[0].pageBuilder;

  return pageContent;
};
