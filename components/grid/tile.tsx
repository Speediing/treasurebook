import clsx from 'clsx';
import Image from 'next/image';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <>
      <div
        className={clsx(
          'group flex h-full w-full items-center justify-center overflow-hidden rounded-none border bg-white hover:border-slate-600 dark:bg-black',
          {
            relative: label,
            'border-2 border-slate-600': active,
            'border-neutral-200 dark:border-neutral-800': !active
          }
        )}
      >
        {props.src ? (
          // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
          <Image
            className={clsx('relative h-full w-full object-contain', {
              'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
            })}
            {...props}
          />
        ) : null}
        {/* {label ? (
          <Label
            title={label.title}
            amount={label.amount}
            currencyCode={label.currencyCode}
            position={label.position}
          />
        ) : null} */}
      </div>
      {label ? (
        <div className="flex h-20 flex-col justify-start pt-2 md:h-auto md:flex-row md:justify-between md:pt-0">
          <div className="flex flex-col justify-center">
            <h3 className="l-2 f mr-4 line-clamp-2 py-2 align-middle leading-none tracking-tight ">
              {label.title}
            </h3>
          </div>
          <p
            suppressHydrationWarning={true}
            className={'flex-none text-sm font-light  text-black md:py-2'}
          >
            {`${new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: label?.currencyCode || '',
              currencyDisplay: 'narrowSymbol'
            }).format(parseFloat(label?.amount || ''))}`}
            <span
              className={clsx('ml-1 inline', '@[275px]/label:inline hidden')}
            >{`${label?.currencyCode}`}</span>
          </p>
        </div>
      ) : null}
    </>
  );
}
