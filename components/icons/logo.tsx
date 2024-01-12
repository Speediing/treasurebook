import Image from 'next/image';

export default function LogoIcon(props: any) {
  return <Image src={props.imageUrl} className="h-[59px]" alt="" width={200} height={59} />;
}
