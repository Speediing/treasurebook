import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { Metadata } from 'next';
import { getProductsSanity } from '../../../sanity/lib/queries/products';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  return {
    title: '',
    description: ''
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  // const products = await getProducts({ sortKey, reverse, query: searchValue });
  // const products = await getProducts({ sortKey, reverse, query: searchValue });
  const products = await getProductsSanity();
  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
