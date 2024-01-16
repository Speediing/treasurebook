import { groq } from 'next-sanity';
import { client } from '../client';

export const getPageBuilder = async (slug: string) => {
  const content = await client.fetch(
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
  }`
  );

  const pageContent = content[0].pageBuilder;
  console.log(pageContent);
  return pageContent;
};
