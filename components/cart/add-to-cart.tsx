// 'use client';

// import { Button } from '@/components/ui/button';
// import { PlusIcon } from '@radix-ui/react-icons';
// import clsx from 'clsx';
// import { addItem } from 'components/cart/actions';
// import LoadingDots from 'components/loading-dots';
// import { ProductVariant } from 'lib/shopify/types';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useTransition } from 'react';

// export function AddToCart({
//   variants,
//   availableForSale
// }: {
//   variants: ProductVariant[];
//   availableForSale: boolean;
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isPending, startTransition] = useTransition();
//   const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
//   const variant = variants.find((variant: ProductVariant) =>
//     variant.selectedOptions.every(
//       (option) => option.value === searchParams.get(option.name.toLowerCase())
//     )
//   );
//   const selectedVariantId = variant?.id || defaultVariantId;
//   const title = !availableForSale
//     ? 'Out of stock'
//     : !selectedVariantId
//     ? 'Please select options'
//     : undefined;

//   return (
//     <Button
//       variant="outline"
//       aria-label="Add item to cart"
//       disabled={isPending || !availableForSale || !selectedVariantId}
//       title={title}
//       onClick={() => {
//         // Safeguard in case someone messes with `disabled` in devtools.
//         if (!availableForSale || !selectedVariantId) return;

//         startTransition(async () => {
//           const error = await addItem(selectedVariantId);

//           if (error) {
//             // Trigger the error boundary in the root error.js
//             throw new Error(error.toString());
//           }

//           router.refresh();
//         });
//       }}
//       className={clsx(
//         'relative my-6 flex w-full  items-center justify-center  rounded-none border-black  px-4 py-6 tracking-wide text-black hover:opacity-90',
//         {
//           'cursor-not-allowed opacity-60 hover:opacity-60': !availableForSale || !selectedVariantId,
//           'cursor-not-allowed': isPending
//         }
//       )}
//     >
//       <div className="absolute left-0 ml-4">
//         {!isPending ? (
//           <PlusIcon className="h-5" />
//         ) : (
//           <LoadingDots className="left-0 mb-3 bg-black " />
//         )}
//       </div>
//       <span>{availableForSale ? 'Add To Cart' : 'Out Of Stock'}</span>
//     </Button>
//   );
// }
'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative my-6 flex w-full  items-center justify-center  border rounded-none border-black  px-4 py-6 tracking-wide text-black hover:opacity-90';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: pending
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
