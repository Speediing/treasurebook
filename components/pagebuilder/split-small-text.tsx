export const SplitSmallText = ({
  leftOptions,
  rightOptions
}: {
  leftOptions: string[];
  rightOptions: string[];
}) => {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex w-full max-w-[1400px] flex-row justify-between px-16 pt-28 text-xs">
        <div className="flex flex-col">
          {leftOptions.map((x) => (
            <div key={x}>{x}</div>
          ))}
        </div>
        <div className="flex flex-col">
          {' '}
          {rightOptions.map((x) => (
            <div className="text-right" key={x}>
              {x}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
