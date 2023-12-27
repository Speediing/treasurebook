import clsx from 'clsx';
import PortableText from 'components/portableText/PortableText';
import Image from 'next/image';

export const Biography = ({
  body,
  imageUrl,
  title
}: {
  body: any;
  imageUrl: string;
  title: string;
}) => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl ">
          <Image
            alt="Abstract bubbles"
            className="h-auto w-full bg-gray-300"
            height={600}
            src={imageUrl}
            objectFit={'cover'}
            width="600"
          />
        </div>
      </div>
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <PortableText
            blocks={body}
            centered
            className={clsx(
              'mx-auto max-w-[660px]  pt-8', //
              ''
            )}
          />
        </div>
      </div>
    </>
  );
};
