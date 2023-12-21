import { client } from '../client';

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
