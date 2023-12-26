import groq from 'groq';
import { client } from '../client';
import { urlForImage } from '../image';
import { LINKS } from './fragments/links';
import { PORTABLE_TEXT } from './fragments/portableText/portableText';

export const LAYOUT_QUERY = groq`
  *[_type == 'settings'] | order(_updatedAt desc) [0] {
    seo,
    "menuLinks": menu.links[] {
        ${LINKS}
      },
    "logo": menu.logo,
    footer {
        links[] {
          ${LINKS}
        },
        text[]{
          ${PORTABLE_TEXT}
        },
      },
      notFoundPage {
        body,
        "collectionGid": collection->store.gid,
        title
      }
  }
`;

export const getNavItemsSanity = async () => {
  let nav;
  try {
    nav = await client.fetch(LAYOUT_QUERY);
  } catch (error) {
    console.log(error);
  }

  const logoUrl = urlForImage(nav.logo.asset._ref);
  const navOptions = nav.menuLinks.map((x: any) => {
    return { title: x.title, path: x.slug };
  });
  return { navOptions, logoUrl };
};

export const FOOTER_QUERY = groq`
  *[_type == 'settings'] | order(_updatedAt desc) [0] {

    footer {
        links[] {
          ${LINKS}
        },
        text[],
        copyright
      },
     
  }
`;

export const getNavFooterSanity = async () => {
  let nav;
  try {
    nav = await client.fetch(FOOTER_QUERY);
  } catch (error) {
    console.log(error);
  }

  return { footer: nav.footer };
};
