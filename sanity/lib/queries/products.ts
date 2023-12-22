import { groq } from 'next-sanity';
import { client } from '../client';

import { PRODUCT_PAGE } from './fragments/pages/product';

export const getProductsSanity = async ({ sortKey, reverse, query }: any) => {
  if (query) {
    const products = await client.fetch(
      `*[_type == "product" && store.title match '${query}']{'title': store.title, "slug": store.slug.current, "image": store.previewImageUrl, "price": store.priceRange.maxVariantPrice}`
    );
    return products;
  }
  const products = await client.fetch(
    `*[_type == "product"]{'title': store.title, "slug": store.slug.current, "image": store.previewImageUrl, "price": store.priceRange.maxVariantPrice}`
  );
  return products;
};

export const getProductSanity = async (handle: string) => {
  console.log(handle);
  const PRODUCT_PAGE_QUERY = groq`
  *[
    _type == 'product'
    && store.slug.current == '${handle}'
  ] | order(_updatedAt desc) [0]{
    ${PRODUCT_PAGE}
  }
`;
  console.log(PRODUCT_PAGE_QUERY);
  const product = await client.fetch(PRODUCT_PAGE_QUERY);
  return product;
};
