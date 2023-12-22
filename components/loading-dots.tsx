import clsx from 'clsx';

const dots = 'mx-[1px] inline-block h-0.5 w-0.5 animate-pulse rounded-md';

const LoadingDots = ({ className }: { className: string }) => {
  return (
    <span className="-mr-2 inline-flex items-center pr-2">
      <span className={clsx(dots, className)} />
      <span className={clsx(dots, 'animation-delay-[200ms]', className)} />
      <span className={clsx(dots, 'animation-delay-[400ms]', className)} />
    </span>
  );
};

export default LoadingDots;
