import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import clsx from 'clsx';
import { AddToCart } from 'components/cart/add-to-cart';
import PortableText from 'components/portableText/PortableText';
import { SelectedPrice } from 'components/price';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';
export function ProductDescription({
  product,
  productData
}: {
  product: Product;
  productData: any;
}) {
  return (
    <div className="flex flex-row justify-center">
      <div className="w-full max-w-lg md:px-0">
        <h1 className="mb-1 text-xl font-bold md:text-2xl">{product.title}</h1>

        <SelectedPrice variants={product.variants} />
        <div className="flex items-center justify-between py-4 mt-4 border-b md:mt-8">
          <span className="text-lg font-medium">Quantity</span>
          <div className="flex items-center">
            <Button className="px-4 py-2">-</Button>
            <span className="px-4">1</span>
            <Button className="px-4 py-2">+</Button>
          </div>
        </div>
        <VariantSelector options={product.options} variants={product.variants} />
        <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
        <Tabs
          defaultValue={productData.tabsArray[0].title}
          className="flex  flex-col gap-3 text-xs md:flex-row md:gap-[100px]"
        >
          <TabsList className="flex flex-row justify-start gap-4 text-xs mmin-w-32 overflow-x-aut h-fit whitespace-nowrap md:flex-col md:gap-0">
            {productData.tabsArray.map((tab) => {
              return (
                <TabsTrigger
                  className="h-fit  w-full justify-start text-left text-xs font-bold text-neutral-500 data-[state=active]:text-black"
                  value={tab.title}
                >
                  {tab.title}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {productData.tabsArray.map((tab) => {
            return (
              <TabsContent value={tab.title}>
                <PortableText
                  blocks={tab.body}
                  centered
                  className={clsx(
                    ' max-w-[660px] ', //
                    ''
                  )}
                />
              </TabsContent>
            );
          })}
        </Tabs>
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
    </div>
  );
}
