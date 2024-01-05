'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AccountOption = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname();
  return (
    <Link
      className={`block hover:underline ${
        href === pathname ? 'text-black underline' : 'text-gray-700'
      }`}
      href={href}
    >
      {label}
    </Link>
  );
};
