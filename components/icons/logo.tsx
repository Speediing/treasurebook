import Image from 'next/image';

export default function LogoIcon(props: any) {
  return <Image src={props.imageUrl} alt="" width={200} height={150} />;
}
