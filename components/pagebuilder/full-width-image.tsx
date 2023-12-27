import Image from 'next/image';

export const FullWidthImage = ({ imageUrl }: { imageUrl: string }) => {
  if (imageUrl.length > 1) {
    return (
      <div className="max-h-[1440]">
        <Image
          alt=""
          src={imageUrl}
          height="500"
          width={'1000'}
          className={'h-full max-h-[40rem] w-full object-cover'}
          objectFit={'cover'}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};
