import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';
const getVariantText = (product: Product) => {
  if (product.variants.length > 1 && product)
    return `?${product?.variants[0]?.selectedOptions[0]?.name.toLowerCase()}=${product?.variants[0]
      ?.selectedOptions[0]?.value}`;
  return '';
};

export default function ProductGridItems({ products }: { products: any[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block w-full h-full"
            href={`/product/${product.handle}${getVariantText(product)}`}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.minVariantPrice.amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
