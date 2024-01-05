'use client';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import PortableText from '../PortableText';

// import type { SanityModuleAccordion } from '~/lib/sanity';

// type Props = {
//   value: PortableTextBlock;
// };

export default function AccordionBlock({ value }: any) {
  return (
    <div
      className={clsx(
        'first:mt-0 last:mb-0', //
        'my-8'
      )}
    >
      {value?.groups?.map((group) => (
        // <div key={group._key}></div>
        <Disclosure key={group._key}>
          {({ open }: { open: boolean }) => (
            <div className="border-b-gray flex flex-col border-b">
              <Disclosure.Button
                className={clsx(
                  'flex items-center justify-between py-4 text-lg font-bold transition-opacity duration-200 ease-out',
                  'hover:opacity-60'
                )}
              >
                <div className="truncate">{group.title}</div>
                {/* <div className="ml-4 shrink-0">{open ? <MinusIcon /> : <PlusIcon />}</div> */}
              </Disclosure.Button>
              <Disclosure.Panel className="text-md pb-4">
                <PortableText blocks={group.body} />
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
