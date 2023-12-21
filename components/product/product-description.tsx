import { Button } from '@/components/ui/button';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mx-auto max-w-sm py-10">
        <h1 className="mb-1 text-3xl font-bold">STEPHEN J - {product.title}</h1>

        <Price
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
        />
        <div className="mt-8 flex items-center justify-between border-b py-4">
          <span className="text-lg font-medium">Quantity</span>
          <div className="flex items-center">
            <Button className="px-4 py-2">-</Button>
            <span className="px-4">1</span>
            <Button className="px-4 py-2">+</Button>
          </div>
        </div>
        <VariantSelector options={product.options} variants={product.variants} />
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
      </div>

      {/* <div className="flex flex-col pb-6 mb-6 border-b dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="w-auto p-2 mr-auto text-sm text-white rounded-full bg-slate-600">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div> */}

      {/* {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null} */}

      {/* <AddToCart variants={product.variants} availableForSale={product.availableForSale} /> */}
    </>
  );
}
