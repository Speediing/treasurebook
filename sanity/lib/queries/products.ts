import { client } from '../client';

export const getProductsSanity = async () => {
  const products = await client.fetch(
    `*[_type == "product"]{'title': store.title, "slug": store.slug.current, "image": store.previewImageUrl, "price": store.priceRange.maxVariantPrice}`
  );
  return products;
};
