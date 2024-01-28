'use client';
import clsx from 'clsx';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
function arraysMatch(arr1, arr2) {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Iterate through the arrays and compare objects
  for (let i = 0; i < arr1.length; i++) {
    // Customize this comparison logic based on your criteria
    if (!objectsMatch(arr1[i], arr2[i])) {
      return false;
    }
  }

  // If all objects match, return true
  return true;
}
function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
function objectsMatch(obj1, obj2) {
  // Customize this function to define your matching criteria
  // For example, you can compare specific properties of the objects
  // If the criteria match, return true; otherwise, return false
  return obj1.name === obj2.name && obj1.value === obj2.value;
}
const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount))}`}
    <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
  </p>
);

export const SelectedPrice = ({
  variants,
  className,
  currencyCodeClassName
}: {
  variants: ProductVariant[];
  className?: string;

  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => {
  const searchParams = useSearchParams();
  const selectedProduct: any[] = [];
  for (let p of searchParams) {
    selectedProduct.push({ name: titleCase(p[0]), value: p[1] });
  }
  let chosenVariant: any = variants[0];
  for (let v of variants) {
    if (arraysMatch(selectedProduct, v.selectedOptions)) {
      chosenVariant = v;
    }
  }

  if (chosenVariant)
    return (
      <p suppressHydrationWarning={true} className={className}>
        {`${new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: chosenVariant.price.currencyCode,
          currencyDisplay: 'narrowSymbol'
        }).format(parseFloat(chosenVariant.price.amount))}`}
        <span
          className={clsx('ml-1 inline', currencyCodeClassName)}
        >{`${chosenVariant.price.currencyCode}`}</span>
      </p>
    );
};

export default Price;
